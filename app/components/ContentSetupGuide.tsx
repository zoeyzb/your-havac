'use client'

import { CheckCircle, Copy, Database, ExternalLink, FileJson, Terminal } from 'lucide-react'
import { useState } from 'react'

interface ContentSetupGuideProps {
  drupalBaseUrl?: string
}

export default function ContentSetupGuide({ drupalBaseUrl }: ContentSetupGuideProps) {
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'cli' | 'manual'>('cli')

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(label)
    setTimeout(() => setCopiedText(null), 2000)
  }

  const cliCommand = 'npm run setup-content'

  const adminImportUrl = drupalBaseUrl
    ? `${drupalBaseUrl}/admin/content/import`
    : 'https://your-space.decoupled.website/admin/content/import'

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Database className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Almost There! Import Your Content
          </h1>
          <p className="text-gray-600">
            Your Drupal connection is working. Now import the starter content to see your site.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-lg p-4">
            <h2 className="font-semibold text-emerald-900 mb-2">
              ✅ Connection Successful
            </h2>
            <p className="text-emerald-800 text-sm">
              Your Next.js app is connected to Drupal. The content types and sample content just need to be imported.
            </p>
          </div>

          {/* Tab buttons */}
          <div className="flex gap-2 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('cli')}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'cli'
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Terminal className="w-4 h-4 inline mr-2" />
              CLI Import (Recommended)
            </button>
            <button
              onClick={() => setActiveTab('manual')}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'manual'
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <FileJson className="w-4 h-4 inline mr-2" />
              Manual Import
            </button>
          </div>

          {/* CLI Tab */}
          {activeTab === 'cli' && (
            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-xs font-mono">Terminal</span>
                  <button
                    onClick={() => copyToClipboard(cliCommand, 'cli')}
                    className="text-gray-400 hover:text-white transition-colors"
                    title="Copy command"
                  >
                    {copiedText === 'cli' ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <code className="text-emerald-400 font-mono text-sm block">
                  {cliCommand}
                </code>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Steps:</h3>
                <ol className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="bg-emerald-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5">1</span>
                    Open your terminal in this project directory
                  </li>
                  <li className="flex items-start">
                    <span className="bg-emerald-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5">2</span>
                    Run the command above (it uses your <code className="bg-gray-200 px-1 rounded">.env.local</code> credentials)
                  </li>
                  <li className="flex items-start">
                    <span className="bg-emerald-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5">3</span>
                    Wait for the import to complete
                  </li>
                  <li className="flex items-start">
                    <span className="bg-emerald-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5">4</span>
                    Refresh this page
                  </li>
                </ol>
              </div>
            </div>
          )}

          {/* Manual Tab */}
          {activeTab === 'manual' && (
            <div className="space-y-4">
              <p className="text-gray-600 text-sm">
                Prefer to import manually? Copy the JSON from the starter content file and paste it into your Drupal admin.
              </p>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Steps:</h3>
                <ol className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5">1</span>
                    <div>
                      <span>Open </span>
                      <code className="bg-gray-200 px-1 rounded">data/starter-content.json</code>
                      <span> in this project and copy its contents</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5">2</span>
                    <div>
                      <span>Go to your Drupal admin: </span>
                      <a
                        href={adminImportUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline inline-flex items-center gap-1"
                      >
                        {adminImportUrl.replace('https://', '')}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5">3</span>
                    Paste the JSON into the import form
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5">4</span>
                    Click &quot;Preview&quot; to verify, then &quot;Import&quot; to apply
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5">5</span>
                    Refresh this page
                  </li>
                </ol>
              </div>

              <div className="flex gap-4">
                <a
                  href={adminImportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg font-medium text-center hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  Open Drupal Import Page
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:from-emerald-700 hover:to-blue-700 transition-all"
            >
              Check Again
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              The JSON file at <code className="bg-gray-100 px-1 rounded">data/starter-content.json</code> defines
              your content types and sample content. You can customize it for your project.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
