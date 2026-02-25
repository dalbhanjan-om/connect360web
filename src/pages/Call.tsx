import { LockKeyhole, MessageCircle, Phone, ShieldCheck } from "lucide-react";

const DEFAULT_OWNER_NAME = "Car Owner";
const CONTACT_NUMBER = "+91 8432445115";
const DEFAULT_EMERGENCY_NUMBER = "112";
const DEFAULT_SPONSOR_LABEL = "Sponsored by";

function sanitizePhoneNumber(input: string): string {
	return input.replace(/[^+\d]/g, "");
}

function buildSmsLink(phone: string, text: string): string {
	const encodedText = encodeURIComponent(text);
	return `sms:${phone}?body=${encodedText}`;
}

function buildWhatsAppLink(phone: string, text: string): string {
	const digitsOnlyPhone = phone.replace(/\D/g, "");
	const encodedText = encodeURIComponent(text);
	return `https://wa.me/${digitsOnlyPhone}?text=${encodedText}`;
}

export default function Call() {
	const searchParams = new URLSearchParams(window.location.search);

	const ownerName = searchParams.get("owner") ?? DEFAULT_OWNER_NAME;
	const sponsorLabel = searchParams.get("sponsorLabel") ?? DEFAULT_SPONSOR_LABEL;
	const contactNumber = sanitizePhoneNumber(CONTACT_NUMBER);
	const smsText =
		searchParams.get("text") ??
		`Hi ${ownerName}, I scanned this QR and need to contact you. Please respond when possible.`;

	const callLink = `tel:${contactNumber}`;
	const emergencyCallLink = `tel:${sanitizePhoneNumber(DEFAULT_EMERGENCY_NUMBER)}`;
	const smsLink = buildSmsLink(contactNumber, smsText);
	const whatsappLink = buildWhatsAppLink(contactNumber, smsText);

	return (
		<main className="min-h-dvh bg-linear-to-b from-black via-slate-950 to-black px-4 py-5">
			<div className="mx-auto w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/90 p-5 shadow-2xl">
				<div className="text-center">
					<p className="text-xs uppercase tracking-[0.22em] text-slate-400">
						Connect 360 Degree
					</p>
					<h1 className="mt-2 text-3xl font-semibold text-white">Contact Owner</h1>
					<p className="mt-2 text-sm text-slate-300">
						Choose any option below to connect instantly.
					</p>
					<p className="mt-2 text-xs text-slate-400">Owner: {ownerName}</p>
				</div>

				<div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-3">
					<p className="px-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
						Quick Contact
					</p>
					<div className="mt-3 flex flex-col gap-3">
					<a
						href={callLink}
						aria-label="Call owner"
						className="group flex min-h-18 items-center justify-between gap-3 rounded-2xl border border-white/20 bg-white px-4 py-3 text-slate-950 shadow-lg transition active:scale-[0.98]"
					>
						<span className="flex items-center gap-3">
							<span className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 ring-2 ring-slate-200">
								<Phone size={20} strokeWidth={2.2} />
							</span>
							<span className="text-base font-semibold">Call</span>
						</span>
						<span className="text-xs font-medium text-slate-500">Tap to connect</span>
					</a>

					<a
						href={smsLink}
						aria-label="Message owner"
						className="group flex min-h-18 items-center justify-between gap-3 rounded-2xl border border-white/20 bg-linear-to-b from-slate-900 to-slate-800 px-4 py-3 text-white shadow-lg transition active:scale-[0.98]"
					>
						<span className="flex items-center gap-3">
							<span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 ring-2 ring-white/20">
								<MessageCircle size={20} strokeWidth={2.2} />
							</span>
							<span className="text-base font-semibold">Message</span>
						</span>
						<span className="text-xs font-medium text-slate-300">Tap to connect</span>
					</a>

					<a
						href={whatsappLink}
						target="_blank"
						rel="noreferrer"
						aria-label="WhatsApp owner"
						className="group flex min-h-18 items-center justify-between gap-3 rounded-2xl border border-emerald-300/30 bg-emerald-500/15 px-4 py-3 text-emerald-100 shadow-lg transition active:scale-[0.98]"
					>
						<span className="flex items-center gap-3">
							<span className="grid h-10 w-10 place-items-center rounded-full bg-emerald-400/20 ring-2 ring-emerald-300/30">
								<MessageCircle size={20} strokeWidth={2.2} />
							</span>
							<span className="text-base font-semibold">WhatsApp</span>
						</span>
						<span className="text-xs font-medium text-emerald-200">Tap to connect</span>
					</a>
					</div>
				</div>

				<div className="mt-4 flex justify-center">
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
