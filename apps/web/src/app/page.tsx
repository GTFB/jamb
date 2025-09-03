import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">Jamb</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A modern Git-as-CMS platform with multi-site support, built with Next.js, 
            TypeScript, and Bun. Create, manage, and deploy content with ease.
          </p>
          
          <div className="flex gap-4 justify-center mb-12">
            <Link 
              href="/admin"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Admin
            </Link>
            <Link 
              href="/site-a"
              className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-900 transition-colors"
            >
              View Site A
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-3">Git-as-CMS</h3>
              <p className="text-gray-600">
                Manage content through Git with MDX files and automatic validation.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-3">Multi-Site</h3>
              <p className="text-gray-600">
                Create and manage multiple sites from a single platform.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-3">Modern Stack</h3>
              <p className="text-gray-600">
                Built with Next.js, TypeScript, Tailwind CSS, and Bun runtime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
