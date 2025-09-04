---
to: apps/web/src/app/<%= path %>/page.tsx
---
import { Button } from '@jamb/ui';
import { Input } from '@jamb/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@jamb/ui';

export default function <%= h.changeCase.pascalCase(name) %>Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle><%= h.changeCase.pascalCase(name) %></CardTitle>
          <CardDescription>
            <%= description %>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="input" className="block text-sm font-medium text-gray-700">
                Input Field
              </label>
              <Input
                id="input"
                placeholder="Enter text..."
                className="mt-1"
              />
            </div>
            
            <div className="flex space-x-2">
              <Button variant="default">
                Primary Action
              </Button>
              <Button variant="outline">
                Secondary Action
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
