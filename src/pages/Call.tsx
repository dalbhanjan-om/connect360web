import { LockKeyhole, MessageCircle, Phone, ShieldCheck } from "lucide-react";

const DEFAULT_OWNER_NAME = "Car Owner";
const DEFAULT_PHONE_NUMBER = "+1234567890";
const FIXED_CALL_NUMBER = "+91 84332445115";
const DEFAULT_EMERGENCY_NUMBER = "112";
const DEFAULT_SPONSOR_LABEL = "Sponsored by";

function sanitizePhoneNumber(input: string): string {
	return input.replace(/[^+\d]/g, "");
}

function buildSmsLink(phone: string, text: string): string {
	const encodedText = encodeURIComponent(text);
	return `sms:${phone}?body=${encodedText}`;
}

export default function Call() {
	const searchParams = new URLSearchParams(window.location.search);

	const ownerName = searchParams.get("owner") ?? DEFAULT_OWNER_NAME;
	const phoneNumber = sanitizePhoneNumber(
		searchParams.get("phone") ?? DEFAULT_PHONE_NUMBER,
	);
	const sponsorLabel = searchParams.get("sponsorLabel") ?? DEFAULT_SPONSOR_LABEL;
	const smsText =
		searchParams.get("text") ??
		`Hi ${ownerName}, I scanned this QR and need to contact you. Please respond when possible.`;

	const callLink = `tel:${sanitizePhoneNumber(FIXED_CALL_NUMBER)}`;
	const emergencyCallLink = `tel:${sanitizePhoneNumber(DEFAULT_EMERGENCY_NUMBER)}`;
	const smsLink = buildSmsLink(phoneNumber, smsText);

	return (
		<main className="min-h-dvh bg-linear-to-b from-black via-slate-950 to-black px-4 py-5">
			<div className="mx-auto flex min-h-[88dvh] w-full max-w-md flex-col justify-between rounded-3xl border border-white/10 bg-slate-900/90 p-5 shadow-2xl">
				<div className="mb-8 text-center">
					<p className="text-xs uppercase tracking-[0.22em] text-slate-400">
						Connect 360 Degree
					</p>
					<h1 className="mt-2 text-3xl font-semibold text-white">Contact Owner</h1>
					<p className="mt-2 text-sm text-slate-300">
						Use the buttons below to quickly call or message the owner.
					</p>
					<p className="mt-2 text-xs text-slate-400">Owner: {ownerName}</p>
				</div>

				<div className="grid grid-cols-2 gap-4 pt-3">
					<a
						href={callLink}
						aria-label="Call owner"
						className="group flex min-h-52 flex-col items-center justify-center rounded-3xl border border-white/20 bg-white px-3 py-4 text-slate-950 shadow-lg transition active:scale-[0.98]"
					>
						<span className="grid h-22 w-22 place-items-center rounded-full bg-slate-100 ring-2 ring-slate-200">
							<Phone size={44} strokeWidth={2.2} />
						</span>
						<span className="mt-3 text-base font-semibold">Call Owner</span>
					</a>

					<a
						href={smsLink}
						aria-label="Message owner"
						className="group flex min-h-52 flex-col items-center justify-center rounded-3xl border border-white/20 bg-linear-to-b from-slate-900 to-slate-800 px-3 py-4 text-white shadow-lg transition active:scale-[0.98]"
					>
						<span className="grid h-22 w-22 place-items-center rounded-full bg-white/10 ring-2 ring-white/20">
							<MessageCircle size={44} strokeWidth={2.2} />
						</span>
						<span className="mt-3 text-base font-semibold">Message Owner</span>
					</a>
				</div>

				<div className="mt-3 flex justify-center">
					<a
						href={emergencyCallLink}
						aria-label="Emergency contact"
						className="inline-flex items-center gap-2 rounded-full border border-amber-300/35 bg-amber-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-amber-200 transition active:scale-[0.98]"
					>
						<Phone size={14} />
						<span>Emergency Contact</span>
					</a>
				</div>

				<div className="mt-4 rounded-2xl border border-white/15 bg-white/5 p-3 text-center">
					<p className="text-[11px] uppercase tracking-[0.14em] text-slate-300">
						{sponsorLabel}
					</p>
					<div className="mt-2 rounded-lg border border-dashed border-white/20 bg-slate-900/40 px-3 py-4 text-xs text-slate-300">
						Sponsored company logo
					</div>
				</div>

				<div className="mt-7 rounded-2xl border border-emerald-400/25 bg-emerald-500/10 p-4 text-left">
					<div className="mb-2 flex items-center gap-2 text-emerald-300">
						<ShieldCheck size={18} />
						<p className="text-sm font-semibold">Privacy & Security</p>
					</div>
					<ul className="space-y-2 text-sm text-emerald-100/90">
						<li className="flex items-start gap-2">
							<LockKeyhole size={16} className="mt-0.5 shrink-0" />
							<span>Privacy is protected: both owner and caller numbers are hidden.</span>
						</li>
						<li className="flex items-start gap-2">
							<LockKeyhole size={16} className="mt-0.5 shrink-0" />
							<span>No phone numbers are shared on this page, and contact happens through secure call/message actions only.</span>
						</li>
					</ul>
				</div>
			</div>
		</main>
	);
}
