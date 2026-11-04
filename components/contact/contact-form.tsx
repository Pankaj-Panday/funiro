"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const fieldClass =
  "border-light placeholder:text-light focus-visible:border-primary focus-visible:ring-primary h-auto rounded-[10px] px-7 py-5 focus-visible:ring-1";
const labelClass = "text-dark mb-5.5 text-base leading-normal";

export default function ContactForm() {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="w-full space-y-9 md:max-w-lg">
      <div>
        <Label htmlFor="name" className={labelClass}>
          Your name
        </Label>
        <Input
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
        <Label htmlFor="email" className={labelClass}>
          Email address
        </Label>
        <Input
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
        <Label htmlFor="subject" className={labelClass}>
          Subject
        </Label>
        <Input
          id="subject"
          name="subject"
          type="text"
          autoComplete="off"
          placeholder="This is optional"
          className={fieldClass}
        />
      </div>

      <div>
        <Label htmlFor="message" className={labelClass}>
          Message
        </Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Hi! I'd like to ask about"
          className={`${fieldClass} field-sizing-fixed`}
        />
      </div>

      <Button
        type="submit"
        size="none"
        className="rounded-[5px] px-20 py-3.75 text-base font-normal"
      >
        Send
      </Button>
    </form>
  );
}
