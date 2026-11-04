"use client";

import { Check, Link as LinkIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export default function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;

    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
  }

  return (
    <Button variant="ghost" onClick={copyLink} className="text-dark -ml-2.5 text-base">
      {copied ? <Check /> : <LinkIcon />}
      {copied ? "Copied" : "Copy link"}
    </Button>
  );
}
