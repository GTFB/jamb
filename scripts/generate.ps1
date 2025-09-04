# Jamb UI Generator Script
# Быстрый способ создания компонентов с Shadcn/ui

param(
    [Parameter(Position=0)]
    [string]$Type,
    
    [Parameter(Position=1)]
    [string]$Name,
    
    [Parameter(Position=2)]
    [string]$Path,
    
    [Parameter(Position=3)]
    [string]$Description
)

Write-Host "🎨 Jamb UI Generator" -ForegroundColor Cyan
Write-Host "==================" -ForegroundColor Cyan

switch ($Type) {
    "ui" {
        Write-Host "Creating UI component: $Name" -ForegroundColor Green
        bunx hygen ui-component new $Name --className $Path
    }
    "page" {
        Write-Host "Creating page: $Name" -ForegroundColor Green
        bunx hygen page new $Name --path $Path --description $Description
    }
    "form" {
        Write-Host "Creating form: $Name" -ForegroundColor Green
        bunx hygen form new $Name --description $Path
    }
    "dnd" {
        Write-Host "Creating DnD component: $Name" -ForegroundColor Green
        bunx hygen dnd-component new $Name
    }
    default {
        Write-Host "Usage:" -ForegroundColor Yellow
        Write-Host "  bun run generate ui <name> [className]     - Create UI component" -ForegroundColor White
        Write-Host "  bun run generate page <name> [path] [desc] - Create page" -ForegroundColor White
        Write-Host "  bun run generate form <name> [desc]        - Create form" -ForegroundColor White
        Write-Host "  bun run generate dnd <name>                - Create DnD component" -ForegroundColor White
        Write-Host ""
        Write-Host "Examples:" -ForegroundColor Yellow
        Write-Host "  bun run generate ui badge 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium'" -ForegroundColor White
        Write-Host "  bun run generate page settings 'admin/settings' 'Application settings'" -ForegroundColor White
        Write-Host "  bun run generate form product 'Create or edit product'" -ForegroundColor White
        Write-Host "  bun run generate dnd text-block" -ForegroundColor White
    }
}
