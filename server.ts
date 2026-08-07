import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = apiKey
    ? new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      })
    : null;

  // Health check API
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // AI Concierge API endpoint using Gemini 3.6 Flash
  app.post("/api/ai/assistant", async (req, res) => {
    try {
      const { prompt, context } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      if (!ai) {
        // Fallback response if GEMINI_API_KEY is not set yet
        return res.json({
          reply: `Welcome to Flame Burger AI Assistant! I can help you choose the best gourmet burgers based on your taste. (Note: Add GEMINI_API_KEY in secrets for full AI intelligence). Based on popular choice, I highly recommend our **Ultimate Flame Burger** paired with **Loaded Fries**!`,
          recommendations: ["Ultimate Flame Burger", "Double BBQ Bacon Burger", "Loaded Fries"],
        });
      }

      const systemInstruction = `You are the master Chef & AI Concierge for "FLAME BURGER", a luxury fast-casual gourmet burger restaurant.
Your tone is confident, enthusiastic, culinary-expert, warm, and helpful.
You assist customers with:
1. Finding the perfect burger based on their preferences (spicy, smoky, cheese lovers, chicken, vegetarian).
2. Recommending drink and side pairings.
3. Providing detailed nutritional advice, calorie info, and allergen warnings.
4. Answering questions about Flame Burger's 100% Angus Beef, flame-grilling process, and ingredients.

Menu Summary:
- Ultimate Flame Burger ($12.99, 850 kcal): Double Angus beef, cheddar, bacon, caramelized onions, signature Flame sauce.
- BBQ Bacon Burger ($11.99, 810 kcal): Angus beef, smoked bacon, crispy onion rings, hickory BBQ sauce.
- Spicy Chicken Burger ($9.99, 720 kcal): Crispy buttermilk chicken, jalapeños, pepper jack cheese, spicy mayo.
- Double Cheese Burger ($12.99, 890 kcal): Double Angus patties, triple cheddar, pickles, house sauce.
- Truffle Mushroom Burger ($14.99, 780 kcal): Single Angus patty, sautéed swiss mushrooms, black truffle aioli, brioche bun.
- Smash Original ($10.99, 680 kcal): Crispy smash patty, American cheese, grilled onions.
- Loaded Fries ($6.99, 540 kcal): Melted cheddar, bacon bits, jalapeños, green onion.
- Oreo Milkshake ($5.99, 490 kcal): Creamy vanilla, crushed Oreo cookies, whipped cream.

Keep your response concise, elegant, structured, and appetizing. Use markdown bolding for dish names.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || "I'd love to help you find your next favorite burger at Flame Burger!";
      res.json({ reply: replyText });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({
        error: "AI service temporarily busy",
        reply: "Welcome to Flame Burger! I recommend trying our **Ultimate Flame Burger** with **Loaded Fries** and an **Oreo Milkshake** for the ultimate experience!",
      });
    }
  });

  // OAuth Auth URL Generator
  app.get("/api/auth/oauth-url", (req, res) => {
    const provider = req.query.provider as string;
    const origin = req.headers.referer ? new URL(req.headers.referer).origin : "http://localhost:3000";

    if (provider === "google") {
      return res.json({ url: `${origin}/auth/google-select` });
    }

    if (provider === "facebook") {
      return res.json({ url: `${origin}/auth/facebook-select` });
    }

    res.status(400).json({ error: "Invalid provider" });
  });

  // Google Account Chooser Page
  app.get(["/auth/google-select", "/auth/google-select/"], (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html lang="ar" dir="auto">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>اختيار حساب - Choose an account</title>
          <style>
            * { box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
            body { background: #000000; color: #ffffff; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; padding: 20px; }
            .container { background: #0a0a0a; border: 1px solid #222; border-radius: 24px; width: 100%; max-width: 520px; padding: 40px 32px; box-shadow: 0 20px 40px rgba(0,0,0,0.8); position: relative; }
            .header-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
            .brand-icon { width: 44px; height: 44px; background: #82b440; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
            .brand-icon svg { width: 28px; height: 28px; fill: #000; }
            .header-title { text-align: right; }
            h1 { font-size: 28px; font-weight: 500; margin: 0 0 6px; color: #ffffff; }
            p.sub { font-size: 15px; color: #a1a1a1; margin: 0; }
            .accounts-list { margin-top: 24px; }
            .account-item { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid #1a1a1a; cursor: pointer; transition: background 0.2s, border-radius 0.2s; text-align: right; }
            .account-item:hover { background: #181818; border-radius: 16px; border-bottom-color: transparent; }
            .acc-left { display: flex; align-items: center; gap: 14px; }
            .avatar { width: 42px; height: 42px; border-radius: 50%; background: #4285f4; color: #fff; font-weight: bold; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; overflow: hidden; }
            .avatar img { width: 100%; height: 100%; object-fit: cover; }
            .acc-details { display: flex; flex-direction: column; }
            .acc-name { font-size: 15px; font-weight: 600; color: #ffffff; }
            .acc-email { font-size: 13px; color: #9aa0a6; direction: ltr; text-align: left; }
            .use-another { display: flex; align-items: center; gap: 12px; padding: 18px 20px; color: #8ab4f8; font-size: 14px; font-weight: 500; cursor: pointer; margin-top: 10px; border-radius: 16px; transition: background 0.2s; }
            .use-another:hover { background: #141414; }
            .custom-box { display: none; margin-top: 16px; padding: 16px; background: #141414; border: 1px solid #2a2a2a; border-radius: 16px; }
            .custom-box input { width: 100%; padding: 12px 14px; background: #000; border: 1px solid #333; border-radius: 10px; color: #fff; font-size: 14px; margin-bottom: 10px; outline: none; }
            .custom-box button { width: 100%; padding: 12px; background: #4285f4; color: #fff; border: none; border-radius: 10px; font-weight: 600; font-size: 14px; cursor: pointer; }
            .footer-note { font-size: 12px; color: #666; margin-top: 32px; text-align: center; line-height: 1.6; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header-top">
              <div class="brand-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/>
                </svg>
              </div>
              <div class="header-title">
                <h1>اختيار حساب</h1>
                <p class="sub">المتابعة إلى Flame Burger</p>
              </div>
            </div>

            <div class="accounts-list">
              <div class="account-item" onclick="selectAccount('MAZEN OSAMA', 'mazensaied29@gmail.com')">
                <div class="acc-left">
                  <div class="avatar" style="background: #1a73e8;">M</div>
                  <div class="acc-details">
                    <span class="acc-name">MAZEN OSAMA</span>
                    <span class="acc-email">mazensaied29@gmail.com</span>
                  </div>
                </div>
              </div>

              <div class="account-item" onclick="selectAccount('Mazen Osama', 'omaralasli658@gmail.com')">
                <div class="acc-left">
                  <div class="avatar" style="background: #5c6bc0;">M</div>
                  <div class="acc-details">
                    <span class="acc-name">Mazen Osama</span>
                    <span class="acc-email">omaralasli658@gmail.com</span>
                  </div>
                </div>
              </div>

              <div class="account-item" onclick="selectAccount('Mazen Osama', 'mazenmaximus100@gmail.com')">
                <div class="acc-left">
                  <div class="avatar" style="background: #2e7d32;">M</div>
                  <div class="acc-details">
                    <span class="acc-name">Mazen Osama</span>
                    <span class="acc-email">mazenmaximus100@gmail.com</span>
                  </div>
                </div>
              </div>

              <div class="account-item" onclick="selectAccount('mazen OSAMA', 'mazen112222mazen@gmail.com')">
                <div class="acc-left">
                  <div class="avatar" style="background: #ab47bc;">M</div>
                  <div class="acc-details">
                    <span class="acc-name">mazen OSAMA</span>
                    <span class="acc-email">mazen112222mazen@gmail.com</span>
                  </div>
                </div>
              </div>

              <div class="use-another" onclick="toggleCustom()">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>استخدام حساب آخر (Use another account)</span>
              </div>

              <div id="customBox" class="custom-box">
                <input id="inputName" type="text" placeholder="الاسم (Full Name)" value="Mazen Osama" />
                <input id="inputEmail" type="email" placeholder="البريد الإلكتروني (Google Email)" value="" />
                <button onclick="submitCustom()">تسجيل الدخول (Sign In)</button>
              </div>
            </div>

            <div class="footer-note">
              قبل استخدام هذا التطبيق، يمكنك مراجعة سياسة الخصوصية وبنود الخدمة في Flame Burger.
            </div>
          </div>

          <script>
            function selectAccount(name, email) {
              if (window.opener) {
                window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS', name: name, email: email, provider: 'google' }, '*');
                window.close();
              } else {
                alert('تم تسجيل الدخول بـ ' + email);
              }
            }

            function toggleCustom() {
              const el = document.getElementById('customBox');
              el.style.display = el.style.display === 'block' ? 'none' : 'block';
            }

            function submitCustom() {
              const name = document.getElementById('inputName').value || 'Mazen Osama';
              const email = document.getElementById('inputEmail').value;
              if (!email || !email.includes('@')) {
                alert('يرجى إدخال بريد إلكتروني صحيح');
                return;
              }
              selectAccount(name, email);
            }
          </script>
        </body>
      </html>
    `);
  });

  // Facebook Account Chooser Page
  app.get(["/auth/facebook-select", "/auth/facebook-select/"], (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Log in with Facebook</title>
          <style>
            * { box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
            body { background: #18191a; color: #e4e6eb; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; padding: 20px; }
            .card { background: #242526; border: 1px solid #3e4042; border-radius: 16px; width: 100%; max-width: 440px; padding: 36px 28px; box-shadow: 0 12px 28px rgba(0,0,0,0.5); text-align: center; }
            .logo { width: 52px; height: 52px; fill: #1877f2; margin: 0 auto 12px; }
            h1 { font-size: 22px; font-weight: 600; margin: 0 0 6px; color: #fff; }
            p { font-size: 13px; color: #b0b3b8; margin: 0 0 24px; }
            .account-item { display: flex; align-items: center; gap: 14px; padding: 14px 16px; border: 1px solid #3e4042; border-radius: 12px; margin-bottom: 12px; cursor: pointer; transition: background 0.2s; text-align: left; background: #3a3b3c; }
            .account-item:hover { background: #4e4f50; }
            .avatar { width: 44px; height: 44px; border-radius: 50%; background: #1877f2; color: #fff; font-weight: bold; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
            .acc-info { flex: 1; overflow: hidden; }
            .acc-name { font-size: 15px; font-weight: 600; color: #fff; }
            .acc-email { font-size: 13px; color: #b0b3b8; }
            .btn-facebook { background: #1877f2; color: #fff; width: 100%; padding: 12px; border-radius: 8px; font-size: 14px; font-weight: 600; border: none; cursor: pointer; transition: 0.2s; margin-top: 8px; }
            .btn-facebook:hover { background: #166fe5; }
          </style>
        </head>
        <body>
          <div class="card">
            <svg class="logo" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <h1>Log in with Facebook</h1>
            <p>Flame Burger is requesting access to your account name and email address.</p>

            <div class="account-item" onclick="selectAccount('MAZEN OSAMA', 'mazensaied29@gmail.com')">
              <div class="avatar">M</div>
              <div class="acc-info">
                <div class="acc-name">MAZEN OSAMA</div>
                <div class="acc-email">mazensaied29@gmail.com</div>
              </div>
            </div>

            <button class="btn-facebook" onclick="selectAccount('MAZEN OSAMA', 'mazensaied29@gmail.com')">
              Continue as Mazen
            </button>
          </div>

          <script>
            function selectAccount(name, email) {
              if (window.opener) {
                window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS', name: name, email: email, provider: 'facebook' }, '*');
                window.close();
              } else {
                alert('Signed in as ' + email);
              }
            }
          </script>
        </body>
      </html>
    `);
  });

  // OAuth Callback Route
  app.get(["/auth/callback", "/auth/callback/"], (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
        <head><title>Authentication Successful</title></head>
        <body style="background:#050505; color:#fff; font-family:sans-serif; text-align:center; padding-top:50px;">
          <h2>Authentication Completed!</h2>
          <p>Redirecting back to Flame Burger...</p>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS', name: 'Mazen Saied', email: 'mazensaied29@gmail.com' }, '*');
              window.close();
            } else {
              window.location.href = '/';
            }
          </script>
        </body>
      </html>
    `);
  });

  // Mock API for Orders
  app.post("/api/orders", (req, res) => {
    const { items, total, customer, deliveryType } = req.body;
    const orderId = "FB-" + Math.floor(100000 + Math.random() * 900000);
    const estimatedTime = deliveryType === "delivery" ? "25 - 35 mins" : "15 - 20 mins";
    res.json({
      success: true,
      orderId,
      status: "Order Received",
      estimatedTime,
      total,
      createdAt: new Date().toISOString(),
    });
  });

  // Mock API for Reservations
  app.post("/api/reservations", (req, res) => {
    const { branch, date, time, guests, name, email, phone } = req.body;
    const bookingRef = "RES-" + Math.floor(100000 + Math.random() * 900000);
    res.json({
      success: true,
      bookingRef,
      branch,
      date,
      time,
      guests,
      message: `Table reserved successfully for ${name} at ${branch} on ${date} at ${time}. Confirmation sent to ${email}.`,
    });
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Flame Burger Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
