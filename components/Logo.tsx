import Link from "next/link";

export default function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const textSize =
    size === "sm" ? "text-base" : size === "lg" ? "text-2xl" : "text-lg";

  return (
    <Link
      href="/"
      aria-label="Joe Grand home"
      className={`inline-flex font-display font-black tracking-tight ${textSize}`}
    >
      JOE<span className="text-accent">GRAND</span>
    </Link>
  );
}
