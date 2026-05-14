"use client";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body>
        <main
          style={{
            display: "grid",
            minHeight: "100vh",
            placeItems: "center",
            padding: "24px",
            background: "#f4f5f4",
            color: "#111817",
            fontFamily:
              "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
            textAlign: "center"
          }}
        >
          <div style={{ maxWidth: 420 }}>
            <p
              style={{
                margin: 0,
                color: "rgba(17, 24, 23, 0.48)",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase"
              }}
            >
              Application error
            </p>
            <h1
              style={{
                margin: "16px 0 0",
                fontSize: 32,
                fontWeight: 300,
                lineHeight: 1.08
              }}
            >
              The experience could not load.
            </h1>
            <p
              style={{
                margin: "16px 0 0",
                color: "rgba(17, 24, 23, 0.64)",
                fontSize: 14,
                lineHeight: 1.6
              }}
            >
              {error.message || "Restart the dev server and try again."}
            </p>
            <button
              onClick={reset}
              style={{
                minHeight: 44,
                marginTop: 28,
                border: 0,
                borderRadius: 7,
                background: "#111817",
                color: "#ffffff",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 600,
                padding: "0 20px"
              }}
              type="button"
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
