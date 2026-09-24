"use client";

import { Button } from "@/components/ui/Button";

export function ContactForm() {
  return (
    <form className="mt-8 flex max-w-lg flex-col gap-4" onSubmit={(event) => event.preventDefault()}>
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-brand-text">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-xl border border-brand-border px-4 py-3 text-sm focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-brand-text">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-xl border border-brand-border px-4 py-3 text-sm focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-brand-text">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full rounded-xl border border-brand-border px-4 py-3 text-sm focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-none"
        />
      </div>
      <Button type="submit" className="justify-center">
        Send Message
      </Button>
    </form>
  );
}
