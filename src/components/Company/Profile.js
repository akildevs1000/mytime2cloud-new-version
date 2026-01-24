export default function CompanyProfile() {
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 flex flex-col gap-8">
                    {/* ===== Company Identity ===== */}
                    <section className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm p-6 md:p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 dark:bg-indigo-400/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                        <Header
                            icon="badge"
                            title="Company Identity"
                            description="Legal information and public profile"
                            color="indigo"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Field label="Company Name" span>
                                <Input value="MYTIME CLOUD" bold />
                            </Field>

                            <Field label="Legal Name">
                                <Input value="MyTime Solutions Inc." />
                            </Field>

                            <Field label="Registration No.">
                                <Input value="REG-8842-XJ9" />
                            </Field>

                            <Field label="Industry">
                                <Select
                                    options={[
                                        "Technology & Software",
                                        "Manufacturing",
                                        "Healthcare",
                                        "Retail",
                                    ]}
                                />
                            </Field>

                            <Field label="Website">
                                <div className="flex">
                                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-sm font-medium">
                                        https://
                                    </span>
                                    <Input value="mytime.cloud" rounded="r" />
                                </div>
                            </Field>
                        </div>
                    </section>

                    {/* ===== Location & Contact ===== */}
                    <section className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm p-6 md:p-8">
                        <Header
                            icon="business"
                            title="Location & Contact"
                            description="Headquarters and contact points"
                            color="emerald"
                        />

                        {/* Map */}
                        <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 h-48 bg-slate-100 dark:bg-slate-800 relative">

                            <iframe
                                allowFullScreen=""
                                className="grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                                height="100%"
                                loading="lazy"
                                src="https://www.google.com/maps?q=25.2650,55.2889&hl=en&z=15&output=embed"
                                style={{ border: '0', width: "100%" }}
                            ></iframe>


                        </div>

                        <Field label="Full Address" className="mt-4">
                            <Textarea value="101 Innovation Dr, Suite 500, San Francisco, CA 94103" />
                        </Field>

                        <Divider title="Primary Manager Contact" icon="person" />
                        <ContactGrid
                            values={{
                                name: "Sarah Connor",
                                designation: "HR Director",
                                email: "sarah@mytime.cloud",
                                phone: "+1 (555) 012-3456",
                            }}
                        />

                        <Divider title="Secondary Manager Contact" icon="supervisor_account" />
                        <ContactGrid />
                    </section>
                </div>
                <div className="lg:col-span-5 flex flex-col gap-8">

                    {/* ===== QR Code ===== */}
                    <section className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm p-6 md:p-8 hover:shadow-md transition-shadow">
                        <Header
                            icon="qr_code_2"
                            title="Company QR Code"
                            description="Scan for mobile app access"
                        />

                        <div className="flex flex-col items-center justify-center p-6 bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl relative group cursor-pointer">
                            <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition rounded-xl" />

                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCT2Rbmgd9WmVCwQAJOXil7FgbqKPaBIZmde7z5wXu8DrCydk1rRL-A31dv4XGy59yObYv1BKlLTGbfY1vnQLKplqdTCoCWn_PQcTKDLpM7e8clKfBvayyqSOFUTOzOZ4CYPsHgmVj0Ijky6pUXFsxTQrpjSUN34qwkl73sVUuvvJY_zYesPiuIOgyWRinAL-bKCZsjy7rVzgyxVB7uGegxEtLM-PcMDlccevPJEV4a9RGDOpeDjGyyiHxR6fAc27UKdHMJybt2fEIK"
                                alt="Company QR"
                                className="w-32 h-32 rounded-lg opacity-90 mb-4 group-hover:scale-105 transition-transform"
                            />

                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                                Standard Access Token
                            </p>

                            <button className="mt-4 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 z-10">
                                <span className="material-symbols-outlined text-sm">download</span>
                                Download QR
                            </button>
                        </div>
                    </section>

                    {/* ===== Branding ===== */}
                    <section className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm p-6 md:p-8">
                        <Header
                            icon="palette"
                            title="Corporate Branding"
                            description="Look and feel customization"
                        />

                        {/* Logo Upload */}
                        <div className="mb-8">
                            <Label>Company Logo</Label>
                            <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 transition p-8 flex flex-col items-center gap-3 cursor-pointer">
                                <div className="w-20 h-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center justify-center">
                                    <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400 text-4xl">
                                        cloud_circle
                                    </span>
                                </div>
                                <div className="text-center text-sm">
                                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                                        Click to upload
                                    </span>
                                    <span className="text-slate-500 dark:text-slate-400"> or drag & drop</span>
                                    <p className="text-xs text-slate-400 mt-1">SVG, PNG, JPG (max 2MB)</p>
                                </div>
                            </div>
                        </div>

                        {/* Colors */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <ColorPicker label="Primary" value="#4F46E5" />
                            <ColorPicker label="Secondary" value="#10B981" />
                        </div>

                        {/* Favicon */}
                        <div>
                            <Label>Favicon</Label>
                            <div className="flex items-center gap-4 p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white/60 dark:bg-slate-800/60">
                                <div className="size-8 rounded bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-sm text-slate-400">
                                        star
                                    </span>
                                </div>
                                <p className="flex-1 text-xs text-slate-500 dark:text-slate-400 truncate">
                                    favicon.ico
                                </p>
                                <button className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                                    Update
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* ===== Regional Settings ===== */}
                    <section className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm p-6 md:p-8">
                        <Header
                            icon="public"
                            title="Regional Settings"
                            description="Localization and standards"
                        />

                        <div className="space-y-5">
                            <SelectSideBar label="Timezone" />
                            <div className="grid grid-cols-2 gap-5">
                                <SelectSideBar label="Currency" />
                                <SelectSideBar label="Language" />
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <div className="w-full mt-10">
                <div
                    className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl
    rounded-2xl p-4 px-6
    flex flex-col sm:flex-row items-center justify-between gap-4
    shadow-sm"
                >
                    {/* Last saved */}
                    <div className="text-sm text-slate-400 dark:text-slate-500 hidden sm:block">
                        {/* Last saved:
                        <span className="ml-1 font-medium text-slate-600 dark:text-slate-300">
                            Today at 09:42 AM
                        </span> */}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 w-full sm:w-auto justify-end">
                        <button
                            className="px-6 py-2.5 rounded-lg font-medium
          text-slate-500 dark:text-slate-400
          hover:text-slate-700 dark:hover:text-slate-200
          hover:bg-slate-100/70 dark:hover:bg-slate-800/70 dark:bg-slate-800
          transition"
                        >
                            Cancel
                        </button>

                        <button
                            className="px-8 py-2.5 rounded-lg font-bold
          bg-gradient-to-r from-indigo-600 to-indigo-700
          hover:from-indigo-700 hover:to-indigo-800
          text-white
          shadow-lg shadow-indigo-500/20
          flex items-center gap-2 transition"
                        >
                            <span className="material-symbols-outlined text-[20px]">
                                check
                            </span>
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>

        </>
    );
}

/* ===================== Reusable Components ===================== */

function Header({ icon, title, description, color }) {
    return (
        <div className="flex items-center gap-4 mb-8">
            <div
                className={`p-3 rounded-xl bg-${color}-50 text-${color}-600 dark:bg-${color}-500/10 dark:text-${color}-400`}
            >
                <span className="material-symbols-outlined">{icon}</span>
            </div>
            <div>
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                    {title}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    {description}
                </p>
            </div>
        </div>
    );
}

function Field({ label, children, span, className }) {
    return (
        <div className={`${span ? "md:col-span-2" : ""} ${className || ""}`}>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-500 dark:text-slate-400">
                {label}
            </label>
            {children}
        </div>
    );
}

function Input({ value, bold, rounded }) {
    return (
        <input
            defaultValue={value}
            className={`w-full px-4 py-3 rounded-${rounded || "lg"} border
      bg-white/70 dark:bg-slate-900
      border-slate-200 dark:border-slate-700
      text-slate-800 dark:text-slate-200
      ${bold ? "font-semibold" : ""}
      focus:ring-2 focus:ring-indigo-500/20`}
        />
    );
}

const Label = ({ children }) => (
    <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-500 dark:text-slate-400">
        {children}
    </label>
);


const SelectSideBar = ({ label }) => (
    <div>
        <Label>{label}</Label>
        <select className="w-full bg-white/60 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500/20">
            <option>Option 1</option>
        </select>
    </div>
);

function Select({ options }) {
    return (
        <select className="w-full px-4 py-3 rounded-lg border bg-white/70 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500/20">
            {options.map((o) => (
                <option key={o}>{o}</option>
            ))}
        </select>
    );
}

function Textarea({ value }) {
    return (
        <textarea
            rows={2}
            defaultValue={value}
            className="w-full px-4 py-3 rounded-lg border bg-white/70 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500/20 resize-none"
        />
    );
}

function Divider({ title, icon }) {
    return (
        <div className="flex items-center gap-2 my-6 border-b border-slate-200 dark:border-slate-700 pb-2">
            <span className="material-symbols-outlined text-slate-400 text-sm">
                {icon}
            </span>
            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300">
                {title}
            </h3>
        </div>
    );
}

function ContactGrid({ values = {} }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Contact Name" value={values.name} />
            <Input placeholder="Designation" value={values.designation} />
            <Input placeholder="Email" value={values.email} />
            <Input placeholder="Phone" value={values.phone} />
        </div>
    );
}

const ColorPicker = ({ label, value }) => (
    <div>
        <Label>{label}</Label>
        <div className="flex items-center gap-2 p-2 bg-white/60 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
            <input type="color" defaultValue={value} className="w-8 h-8 rounded" />
            <span className="text-xs font-mono text-slate-600 dark:text-slate-300">
                {value}
            </span>
        </div>
    </div>
);
