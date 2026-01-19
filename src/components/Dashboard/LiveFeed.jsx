function LiveFeed({}) {
  return (
    <>
      <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-white/40">
        <div className="flex items-center gap-3">
          <div className="size-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <h3 className="text-base font-bold text-slate-900 font-display tracking-wide">
            Live Recognition Feed
          </h3>
        </div>
        <div className="flex items-center">
          <div className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 mr-4">
            <button className="px-3 py-1 text-[10px] font-bold rounded-md bg-white text-slate-800 shadow-sm border border-slate-200 transition-all">
              All
            </button>
            <button className="px-3 py-1 text-[10px] font-bold rounded-md text-slate-500 hover:text-rose-600 hover:bg-white transition-colors">
              Late
            </button>
            <button className="px-3 py-1 text-[10px] font-bold rounded-md text-slate-500 hover:text-cyan-600 hover:bg-white transition-colors">
              Early
            </button>
          </div>
          <div className="flex gap-4 items-center pl-4 border-l border-slate-200">
            <button className="text-xs font-bold text-primary hover:text-blue-700 transition-colors uppercase tracking-wider">
              View Full Log
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 px-6 py-3 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/50 gap-2">
        <div className="col-span-3 pl-2">Identity</div>
        <div className="col-span-1">Dept</div>
        <div className="col-span-1">Loc</div>
        <div className="col-span-1">Method</div>
        <div className="col-span-1">Time</div>
        <div className="col-span-1 text-center">Act</div>
        <div className="col-span-2">Punctuality</div>
        <div className="col-span-2 text-right pr-2">Status</div>
      </div>
      <div className="flex-1 overflow-y-auto px-2">
        <div className="grid grid-cols-12 px-4 py-4 minimal-table-row items-center cursor-pointer group gap-2">
          <div className="col-span-3 flex items-center gap-3 pl-2">
            <div className="size-8 rounded-full bg-slate-200 overflow-hidden relative border border-slate-300">
              <img
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVtMhp_XykLj5h5NN1k2TqpsP11CIW25W0Vi7tAxLKwAG1Ll1yu44ufhxY26WC7W9hMgwx2Dc4Whh1MdK4sYUsRUEZ6MfMUhaSDZ8sSBWQdblGwGZvQ_YxLJOtiUJU3lLcQE5GCmofuM5_WWjT-psEJ6TlSs7GMv73SyqYIo1ybgAPo_7FBHPcUBpYIHUaF-QW9Bcrg8J2mAbZFBpy7z36K4ZhpiRmB3Pq9H_NAIsflzQqo4Vz5yBsHY6ykIZLp8hqeF3_QTc5GCGZ"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-800 group-hover:text-slate-950 transition-colors">
                Sarah Jenkins
              </span>
              <span className="text-[9px] text-slate-500">ID: 8842-A</span>
            </div>
          </div>
          <div
            className="col-span-1 text-[10px] text-slate-500 truncate"
            title="Marketing"
          >
            Marketing
          </div>
          <div
            className="col-span-1 text-[10px] text-slate-500 truncate"
            title="Main Lobby"
          >
            Main Lobby
          </div>
          <div className="col-span-1 flex items-center text-slate-400">
            <span
              className="material-symbols-outlined text-[16px]"
              title="Face Scan"
            >
              face
            </span>
          </div>
          <div className="col-span-1 text-[10px] font-mono text-slate-500">
            10:41:22
          </div>
          <div className="col-span-1 text-center flex justify-center">
            <div className="inline-flex items-center justify-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-600 border border-emerald-200 w-16">
              <span className="material-symbols-outlined text-[10px]">
                login
              </span>
              <span>Entry</span>
            </div>
          </div>
          <div className="col-span-2">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-emerald-600">
              <span className="size-1 bg-emerald-500 rounded-full"></span> On
              Time
            </span>
          </div>
          <div className="col-span-2 text-right pr-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-medium text-emerald-600">
              Authorized
            </span>
          </div>
        </div>
        <div className="grid grid-cols-12 px-4 py-4 minimal-table-row items-center cursor-pointer group gap-2">
          <div className="col-span-3 flex items-center gap-3 pl-2">
            <div className="size-8 rounded-full bg-slate-200 overflow-hidden relative border border-slate-300">
              <img
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2O5JDgooB62yd_6-Kf3jYQLoXwhV3DvjsC4I1ri87iTfAeZdkWoJepYeMEx92BYNFPJb4MB4a-XCwt2Ql6e8zXoWpS4Bg8BjuuQmdjCbQiKUIeFVbMVLAq7ZtTCC06s4eQ2lV1gXqs_mJA29AEtxC5T7UUz7cphtlYBtDEPV3SFgbPEtHoHOgRiO6gkPVzDef5Li9HgUp5JGVupezTfcOfx-cvao4eG3LcyK13sz5T62LyYpfFg8RyP9BbDQVz5sPBsG-lMzcXFsN"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-800 group-hover:text-slate-950 transition-colors">
                David Chen
              </span>
              <span className="text-[9px] text-slate-500">ID: 9931-B</span>
            </div>
          </div>
          <div
            className="col-span-1 text-[10px] text-slate-500 truncate"
            title="IT Infra"
          >
            IT Infra
          </div>
          <div
            className="col-span-1 text-[10px] text-slate-500 truncate"
            title="Server Room"
          >
            Server Room
          </div>
          <div className="col-span-1 flex items-center text-slate-400">
            <span
              className="material-symbols-outlined text-[16px]"
              title="Biometric"
            >
              fingerprint
            </span>
          </div>
          <div className="col-span-1 text-[10px] font-mono text-slate-500">
            10:38:45
          </div>
          <div className="col-span-1 text-center flex justify-center">
            <div className="inline-flex items-center justify-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-600 border border-emerald-200 w-16">
              <span className="material-symbols-outlined text-[10px]">
                login
              </span>
              <span>Entry</span>
            </div>
          </div>
          <div className="col-span-2">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-amber-600">
              <span className="size-1 bg-amber-500 rounded-full"></span> Late
              (+15m)
            </span>
          </div>
          <div className="col-span-2 text-right pr-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-rose-50 border border-rose-200 text-[10px] font-medium text-rose-600">
              Flagged
            </span>
          </div>
        </div>
        <div className="grid grid-cols-12 px-4 py-4 minimal-table-row items-center cursor-pointer group gap-2">
          <div className="col-span-3 flex items-center gap-3 pl-2">
            <div className="size-8 rounded-full bg-slate-200 overflow-hidden relative border border-slate-300">
              <img
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9JEVJfEbjna3nGBIOfQrNlQ0HErlAzZphj4H8HHpYc_qKKAg69zwhAUZGzsk2oCNu57H6WrOGQHegEucKTU360aoeMaDwVqAPEikpzO3wgCRWg9CH6zK6efTeoIKlrHtlko3k7TPjPxO0ifsMul2MV9AozVVGdj6GCo8Li2L92YhUJyoG5JsVf8Z08yc3KdPmoyWNfjcH2v1laJ18y3sO485gK61sdhraOV4-iZTVC26kiVlRYmGz1XMMbEgIJgAtms7XK6nUf6Ta"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-800 group-hover:text-slate-950 transition-colors">
                Elena Rodriguez
              </span>
              <span className="text-[9px] text-slate-500">ID: 4421-C</span>
            </div>
          </div>
          <div
            className="col-span-1 text-[10px] text-slate-500 truncate"
            title="HR Dept"
          >
            HR Dept
          </div>
          <div
            className="col-span-1 text-[10px] text-slate-500 truncate"
            title="West Wing"
          >
            West Wing
          </div>
          <div className="col-span-1 flex items-center text-slate-400">
            <span
              className="material-symbols-outlined text-[16px]"
              title="Smart Card"
            >
              badge
            </span>
          </div>
          <div className="col-span-1 text-[10px] font-mono text-slate-500">
            10:35:12
          </div>
          <div className="col-span-1 text-center flex justify-center">
            <div className="inline-flex items-center justify-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-600 border border-emerald-200 w-16">
              <span className="material-symbols-outlined text-[10px]">
                login
              </span>
              <span>Entry</span>
            </div>
          </div>
          <div className="col-span-2">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-cyan-600">
              <span className="size-1 bg-cyan-500 rounded-full"></span> Early
              (-10m)
            </span>
          </div>
          <div className="col-span-2 text-right pr-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-medium text-emerald-600">
              Authorized
            </span>
          </div>
        </div>
        <div className="grid grid-cols-12 px-4 py-4 minimal-table-row items-center cursor-pointer group border-none gap-2">
          <div className="col-span-3 flex items-center gap-3 pl-2">
            <div className="size-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 text-xs font-bold text-slate-500">
              MJ
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-800 group-hover:text-slate-950 transition-colors">
                Michael Jones
              </span>
              <span className="text-[9px] text-slate-500">ID: 1102-X</span>
            </div>
          </div>
          <div
            className="col-span-1 text-[10px] text-slate-500 truncate"
            title="Operations"
          >
            Ops
          </div>
          <div
            className="col-span-1 text-[10px] text-slate-500 truncate"
            title="Loading Bay"
          >
            Load Bay
          </div>
          <div className="col-span-1 flex items-center text-slate-400">
            <span
              className="material-symbols-outlined text-[16px]"
              title="NFC Tag"
            >
              nfc
            </span>
          </div>
          <div className="col-span-1 text-[10px] font-mono text-slate-500">
            10:32:05
          </div>
          <div className="col-span-1 text-center flex justify-center">
            <div className="inline-flex items-center justify-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-100 text-slate-500 border border-slate-200 w-16">
              <span className="material-symbols-outlined text-[10px]">
                logout
              </span>
              <span>Exit</span>
            </div>
          </div>
          <div className="col-span-2">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-emerald-600">
              <span className="size-1 bg-emerald-500 rounded-full"></span> On
              Time
            </span>
          </div>
          <div className="col-span-2 text-right pr-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-medium text-slate-500">
              Logged
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default LiveFeed;
