import React, { useState } from 'react';
import { 
  Globe, 
  Check, 
  Copy, 
  ExternalLink, 
  ShieldCheck, 
  Server, 
  ArrowRight, 
  RefreshCw, 
  AlertCircle,
  HelpCircle,
  Terminal,
  CheckCircle2,
  X
} from 'lucide-react';

interface DomainHostingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DomainHostingModal: React.FC<DomainHostingModalProps> = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'dns' | 'cloudrun' | 'cloudflare' | 'export'>('dns');
  const [isCheckingDns, setIsCheckingDns] = useState(false);
  const [dnsResult, setDnsResult] = useState<{
    checked: boolean;
    hasApexRecords: boolean;
    recordsFound: string[];
    statusMessage: string;
  } | null>(null);

  if (!isOpen) return null;

  const domain = 'talktoworld.co.in';
  const wwwDomain = 'www.talktoworld.co.in';

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleCheckDns = async () => {
    setIsCheckingDns(true);
    try {
      // Query Google's public DNS-over-HTTPS API for talktoworld.co.in A records
      const response = await fetch(`https://dns.google/resolve?name=${domain}&type=A`);
      const data = await response.json();
      
      const recordsFound: string[] = [];
      if (data.Answer && Array.isArray(data.Answer)) {
        data.Answer.forEach((ans: any) => {
          if (ans.type === 1 && ans.data) {
            recordsFound.push(ans.data);
          }
        });
      }

      const googleIps = ['216.239.32.21', '216.239.34.21', '216.239.36.21', '216.239.38.21'];
      const matchesGoogle = recordsFound.some(ip => googleIps.includes(ip));

      setDnsResult({
        checked: true,
        hasApexRecords: recordsFound.length > 0,
        recordsFound,
        statusMessage: matchesGoogle
          ? 'DNS successfully resolved to Google Cloud Run IP addresses! SSL certificate will finalize within 15-60 minutes.'
          : recordsFound.length > 0
          ? `Records detected (${recordsFound.join(', ')}). If recently updated, allow 15-30 minutes for global DNS propagation.`
          : 'No A records detected yet. Please add the DNS records below at your domain registrar.'
      });
    } catch (e: any) {
      setDnsResult({
        checked: true,
        hasApexRecords: false,
        recordsFound: [],
        statusMessage: 'Could not query DNS directly from browser. Check with your registrar or whatsmydns.net.'
      });
    } finally {
      setIsCheckingDns(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-3xl max-h-[92vh] bg-white rounded-2xl border border-[#DCDCCF] shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#EBEBE0] bg-[#FAF9F5] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#4A6B53] text-white flex items-center justify-center shadow-xs">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-[#2C2C24]">Host on {domain}</h2>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-[#E9F0EA] text-[#2D5438] border border-[#C5DAC8]">
                  Custom Domain
                </span>
              </div>
              <p className="text-xs text-[#5A5A40]">
                Step-by-step setup to connect your domain name to this live AI app
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#7A7A66] hover:text-[#2C2C24] hover:bg-[#EBEBE0] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-b border-[#EBEBE0] bg-white flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('dns')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'dns'
                ? 'border-[#4A6B53] text-[#2D5438]'
                : 'border-transparent text-[#7A7A66] hover:text-[#2C2C24]'
            }`}
          >
            1. DNS Records to Add
          </button>
          <button
            onClick={() => setActiveTab('cloudrun')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'cloudrun'
                ? 'border-[#4A6B53] text-[#2D5438]'
                : 'border-transparent text-[#7A7A66] hover:text-[#2C2C24]'
            }`}
          >
            2. Google Cloud Run Setup
          </button>
          <button
            onClick={() => setActiveTab('cloudflare')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'cloudflare'
                ? 'border-[#4A6B53] text-[#2D5438]'
                : 'border-transparent text-[#7A7A66] hover:text-[#2C2C24]'
            }`}
          >
            3. Cloudflare Option (Fastest SSL)
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'export'
                ? 'border-[#4A6B53] text-[#2D5438]'
                : 'border-transparent text-[#7A7A66] hover:text-[#2C2C24]'
            }`}
          >
            4. GitHub / Standalone Server
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {activeTab === 'dns' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-[#F4F8F4] border border-[#C5DAC8] text-[#2D5438] flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#4A6B53] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm text-[#2D5438]">Domain Mapping for {domain}</div>
                  <div className="text-xs text-[#3E6548] mt-0.5">
                    Log in to where you purchased <span className="font-semibold">{domain}</span> (GoDaddy, BigRock, Namecheap, Hostinger, etc.) and add the following DNS records in the <strong>DNS Management / DNS Zone Editor</strong>:
                  </div>
                </div>
              </div>

              {/* Apex Records Table */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#5A5A40]">
                    Apex Domain Records ({domain})
                  </h3>
                  <span className="text-[11px] text-[#7A7A66]">Type: 4 × A Records</span>
                </div>
                <div className="border border-[#DCDCCF] rounded-xl overflow-hidden bg-[#FAF9F5]">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-[#E3E3D8] bg-[#EBEBE0] text-[#5A5A40] font-semibold">
                        <th className="p-2.5">Type</th>
                        <th className="p-2.5">Name / Host</th>
                        <th className="p-2.5">Points to / IPv4 Address</th>
                        <th className="p-2.5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EBEBE0] font-mono">
                      {[
                        { type: 'A', name: '@', val: '216.239.32.21' },
                        { type: 'A', name: '@', val: '216.239.34.21' },
                        { type: 'A', name: '@', val: '216.239.36.21' },
                        { type: 'A', name: '@', val: '216.239.38.21' },
                      ].map((rec, i) => (
                        <tr key={i} className="hover:bg-white transition-colors">
                          <td className="p-2.5 font-bold text-[#4A6B53]">{rec.type}</td>
                          <td className="p-2.5 text-[#2C2C24]">{rec.name}</td>
                          <td className="p-2.5 text-[#2C2C24]">{rec.val}</td>
                          <td className="p-2.5 text-right">
                            <button
                              onClick={() => copyToClipboard(rec.val, `ip-${i}`)}
                              className="px-2 py-1 rounded bg-white hover:bg-[#EBEBE0] border border-[#DCDCCF] text-[10px] font-sans font-medium text-[#2C2C24] inline-flex items-center gap-1 cursor-pointer"
                            >
                              {copiedKey === `ip-${i}` ? <Check className="w-3 h-3 text-[#2D5438]" /> : <Copy className="w-3 h-3 text-[#5A5A40]" />}
                              <span>{copiedKey === `ip-${i}` ? 'Copied' : 'Copy'}</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Subdomain Records Table */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#5A5A40]">
                    Subdomain Record ({wwwDomain})
                  </h3>
                  <span className="text-[11px] text-[#7A7A66]">Type: CNAME</span>
                </div>
                <div className="border border-[#DCDCCF] rounded-xl overflow-hidden bg-[#FAF9F5]">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-[#E3E3D8] bg-[#EBEBE0] text-[#5A5A40] font-semibold">
                        <th className="p-2.5">Type</th>
                        <th className="p-2.5">Name / Host</th>
                        <th className="p-2.5">Points to / Destination</th>
                        <th className="p-2.5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EBEBE0] font-mono">
                      <tr className="hover:bg-white transition-colors">
                        <td className="p-2.5 font-bold text-[#4A6B53]">CNAME</td>
                        <td className="p-2.5 text-[#2C2C24]">www</td>
                        <td className="p-2.5 text-[#2C2C24]">ghs.googlehosted.com.</td>
                        <td className="p-2.5 text-right">
                          <button
                            onClick={() => copyToClipboard('ghs.googlehosted.com.', 'cname-www')}
                            className="px-2 py-1 rounded bg-white hover:bg-[#EBEBE0] border border-[#DCDCCF] text-[10px] font-sans font-medium text-[#2C2C24] inline-flex items-center gap-1 cursor-pointer"
                          >
                            {copiedKey === 'cname-www' ? <Check className="w-3 h-3 text-[#2D5438]" /> : <Copy className="w-3 h-3 text-[#5A5A40]" />}
                            <span>{copiedKey === 'cname-www' ? 'Copied' : 'Copy'}</span>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Live DNS Checker */}
              <div className="p-4 rounded-xl border border-[#DCDCCF] bg-[#FAF9F5] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <RefreshCw className={`w-4 h-4 text-[#4A6B53] ${isCheckingDns ? 'animate-spin' : ''}`} />
                    <span className="text-xs font-bold text-[#2C2C24]">Check Live DNS Propagation</span>
                  </div>
                  <button
                    onClick={handleCheckDns}
                    disabled={isCheckingDns}
                    className="px-3 py-1 rounded-lg bg-[#4A6B53] hover:bg-[#3E5A45] text-white text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isCheckingDns ? 'Querying DNS...' : 'Verify DNS Now'}
                  </button>
                </div>

                {dnsResult && (
                  <div className={`p-3 rounded-lg text-xs flex items-start gap-2.5 ${
                    dnsResult.hasApexRecords 
                      ? 'bg-[#E9F0EA] border border-[#C5DAC8] text-[#2D5438]'
                      : 'bg-[#FFF8E6] border border-[#F3DFC8] text-[#8C521C]'
                  }`}>
                    {dnsResult.hasApexRecords ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-[#2D5438] mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 shrink-0 text-[#8C521C] mt-0.5" />
                    )}
                    <div>
                      <div className="font-semibold">{dnsResult.statusMessage}</div>
                      {dnsResult.recordsFound.length > 0 && (
                        <div className="mt-1 font-mono text-[11px]">
                          Resolved IPs: {dnsResult.recordsFound.join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'cloudrun' && (
            <div className="space-y-4">
              <div className="space-y-3">
                <h3 className="font-bold text-sm text-[#2C2C24] flex items-center gap-2">
                  <Server className="w-4 h-4 text-[#4A6B53]" />
                  <span>Direct Google Cloud Run Custom Domain Setup</span>
                </h3>
                <p className="text-xs text-[#5A5A40] leading-relaxed">
                  Because this application is built and running natively in Google Cloud Run, you can map <strong>talktoworld.co.in</strong> directly from your Google Cloud Console with automated Google-managed SSL.
                </p>
              </div>

              <ol className="space-y-3 text-xs text-[#2C2C24]">
                <li className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E3E3D8] flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#4A6B53] text-white font-bold flex items-center justify-center shrink-0 text-xs">1</span>
                  <div>
                    <strong className="text-[#2C2C24]">Open Google Cloud Console:</strong>
                    <p className="text-[#5A5A40] mt-0.5">
                      Go to <a href="https://console.cloud.google.com/run" target="_blank" rel="noopener noreferrer" className="text-[#4A6B53] underline font-semibold inline-flex items-center gap-1">Cloud Run Console <ExternalLink className="w-3 h-3" /></a> and select the project running your app.
                    </p>
                  </div>
                </li>

                <li className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E3E3D8] flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#4A6B53] text-white font-bold flex items-center justify-center shrink-0 text-xs">2</span>
                  <div>
                    <strong className="text-[#2C2C24]">Manage Custom Domains:</strong>
                    <p className="text-[#5A5A40] mt-0.5">
                      Click <strong>Manage Custom Domains</strong> in the top toolbar, then click <strong>Add Mapping</strong>.
                    </p>
                  </div>
                </li>

                <li className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E3E3D8] flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#4A6B53] text-white font-bold flex items-center justify-center shrink-0 text-xs">3</span>
                  <div>
                    <strong className="text-[#2C2C24]">Select Service & Enter Domain:</strong>
                    <p className="text-[#5A5A40] mt-0.5">
                      Select this Cloud Run container service and enter <code className="bg-[#EBEBE0] px-1.5 py-0.5 rounded text-[11px] font-mono font-bold">talktoworld.co.in</code> (and optionally <code className="bg-[#EBEBE0] px-1.5 py-0.5 rounded text-[11px] font-mono font-bold">www.talktoworld.co.in</code>).
                    </p>
                  </div>
                </li>

                <li className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E3E3D8] flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#4A6B53] text-white font-bold flex items-center justify-center shrink-0 text-xs">4</span>
                  <div>
                    <strong className="text-[#2C2C24]">Google-Managed SSL Certificate:</strong>
                    <p className="text-[#5A5A40] mt-0.5">
                      Once the DNS A records are confirmed by Google, Cloud Run will automatically issue and renew a free Let's Encrypt / Google SSL certificate.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          )}

          {activeTab === 'cloudflare' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#F0F6FF] border border-[#C5D8F6] text-[#1E429F] flex items-start gap-3">
                <Globe className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm">Recommended for Apex CNAME Flattening & Fast SSL</div>
                  <div className="text-xs text-[#2B52B0] mt-0.5">
                    If your domain registrar does not support ALIAS or multiple A records on the apex root, you can point your domain nameservers to Cloudflare (Free Tier).
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs text-[#2C2C24]">
                <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E3E3D8] space-y-2">
                  <div className="font-bold text-[#2C2C24]">How to configure on Cloudflare:</div>
                  <ol className="list-decimal list-inside space-y-1 text-[#5A5A40]">
                    <li>Add <code className="font-mono text-[#2C2C24]">talktoworld.co.in</code> to your Cloudflare account.</li>
                    <li>Change nameservers at your registrar to Cloudflare's assigned nameservers.</li>
                    <li>In Cloudflare DNS, add a <strong>CNAME</strong> record:
                      <ul className="list-disc list-inside pl-4 mt-1 font-mono text-[11px] text-[#2C2C24]">
                        <li>Type: CNAME | Name: @ | Target: ghs.googlehosted.com | Proxy: Proxied (Orange Cloud)</li>
                        <li>Type: CNAME | Name: www | Target: ghs.googlehosted.com | Proxy: Proxied</li>
                      </ul>
                    </li>
                    <li>Under <strong>SSL/TLS</strong>, select <strong>Full</strong> or <strong>Full (strict)</strong>.</li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'export' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-bold text-sm text-[#2C2C24] flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#4A6B53]" />
                  <span>Self-Hosting / Export to VPS, Vercel, or Docker</span>
                </h3>
                <p className="text-xs text-[#5A5A40]">
                  This app is completely self-contained with Vite, React, Express, and Google GenAI. You can export and host on your own server or hosting provider.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold text-[#5A5A40] uppercase tracking-wider">
                  Production Build & Start Commands
                </div>
                <div className="p-3 rounded-xl bg-[#2C2C24] text-[#FAF9F5] font-mono text-xs space-y-2">
                  <div className="text-[#A5D6A7]"># 1. Install dependencies</div>
                  <div>npm install</div>
                  <div className="text-[#A5D6A7] mt-2"># 2. Compile frontend and backend bundle</div>
                  <div>npm run build</div>
                  <div className="text-[#A5D6A7] mt-2"># 3. Launch production server on port 3000</div>
                  <div>npm run start</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold text-[#5A5A40] uppercase tracking-wider">
                  Environment Variables (.env)
                </div>
                <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#DCDCCF] font-mono text-xs text-[#2C2C24] space-y-1">
                  <div>GEMINI_API_KEY="your_api_key_here"</div>
                  <div>APP_URL="https://talktoworld.co.in"</div>
                  <div>PORT=3000</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#EBEBE0] bg-[#FAF9F5] flex items-center justify-between gap-3">
          <div className="text-xs text-[#5A5A40]">
            Configured for <strong className="text-[#2C2C24]">talktoworld.co.in</strong>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://talktoworld.co.in"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#EBEBE0] border border-[#DCDCCF] text-xs font-bold text-[#2C2C24] inline-flex items-center gap-1.5 transition-colors"
            >
              <span>Visit talktoworld.co.in</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-[#4A6B53] hover:bg-[#3E5A45] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
