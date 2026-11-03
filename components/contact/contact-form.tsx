"use client";

const fieldClass =
  "border-light placeholder:text-light focus:border-primary focus:ring-primary w-full rounded-[10px] border px-7 py-5 outline-none focus:ring-1";
const labelClass = "text-dark mb-3 block font-medium";

export default function ContactForm() {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="w-full space-y-8">
      <div>
        <label htmlFor="name" className={labelClass}>
          Your name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="off"
          placeholder="Abc"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="off"
          placeholder="Abc@def.com"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="subject" className={labelClass}>
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          autoComplete="off"
          placeholder="This is optional"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Hi! I'd like to ask about"
          className={fieldClass}
        />
      </div>

      <button
        type="submit"
        className="bg-primary hover:bg-primary-active active:bg-primary-active text-primary-foreground cursor-pointer rounded-[5px] px-20 py-3.5 transition-colors"
      >
        Send
      </button>
    </form>
  );
}
