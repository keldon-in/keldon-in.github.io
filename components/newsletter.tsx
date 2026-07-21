"use client";

import { useState } from "react";

/**
 * Newsletter sign-up. No backend yet — on submit it thanks the user and opens a
 * pre-filled email to the team. Wire to a real list provider before launch.
 */
export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <div>
      {done ? (
        <p className="font-display text-xl font-light text-ink">
          Thank you. We&rsquo;ll be in touch with good things only.
        </p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!email) return;
            setDone(true);
            window.location.href = `mailto:nutraceuticals@aaruby.com?subject=${encodeURIComponent(
              "Newsletter sign-up",
            )}&body=${encodeURIComponent(`Please add me to the Keldon list: ${email}`)}`;
          }}
          className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="nl-email" className="sr-only">
            Email address
          </label>
          <input
            id="nl-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 rounded-full border border-ink/15 bg-paper px-5 py-3.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-evergreen"
          />
          <button
            type="submit"
            className="rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-evergreen"
          >
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
}
