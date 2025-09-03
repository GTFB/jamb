import Link from 'next/link';
import { LoginButton } from '@/components/auth/LoginButton';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/admin" className="text-xl font-bold text-gray-900">
                Jamb Admin
              </Link>
              <nav className="flex space-x-6">
                <Link
                  href="/admin"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin/collections"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Collections
                </Link>
                <Link
                  href="/admin/media"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Media
                </Link>
                <Link
                  href="/admin/constructor"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Constructor
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                View Site
              </Link>
              <LoginButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
