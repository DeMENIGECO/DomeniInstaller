import apps from "./db.js";

// Crea la lista delle applicazioni
function LoadApps() {
    const appList = document.getElementById("app-list");

    if (!appList) {
        console.error('Elemento con id "app-list" non trovato.');
        return;
    }

    appList.innerHTML = "";

    apps.forEach(app => {
        const label = document.createElement("label");
        label.style.display = "block";
        label.style.margin = "8px 0";
        label.style.cursor = "pointer";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = app.id;
        checkbox.className = "app-checkbox";

        label.appendChild(checkbox);
        label.appendChild(
            document.createTextNode(" " + app.name)
        );

        appList.appendChild(label);
    });
}

// Genera e scarica DomeniInstaller.ps1
function MakePS1() {
    const selectedCheckboxes = document.querySelectorAll(
        ".app-checkbox:checked"
    );

    const selectedIds = Array.from(selectedCheckboxes)
        .map(checkbox => Number(checkbox.value));

    const selectedApps = apps.filter(app =>
        selectedIds.includes(app.id)
    );

    if (selectedApps.length === 0) {
        alert("Seleziona almeno un'applicazione!");
        return;
    }

    let ps1 = `# DomeniInstaller
$ErrorActionPreference = "Continue"

$Host.UI.RawUI.WindowTitle = "DomeniInstaller"

Write-Host "DomeniInstaller"
Write-Host "========================"
Write-Host ""

# Controllo dei privilegi di amministratore
$currentIdentity = [Security.Principal.WindowsIdentity]::GetCurrent()
$principal = [Security.Principal.WindowsPrincipal]::new($currentIdentity)
$isAdmin = $principal.IsInRole(
    [Security.Principal.WindowsBuiltInRole]::Administrator
)

if (-not $isAdmin) {
    Write-Host "ERRORE: esegui questo script come amministratore." -ForegroundColor Red
    Read-Host "Premi Invio per uscire"
    exit 1
}

# Controllo disponibilita di WinGet
if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {
    Write-Host "ERRORE: WinGet non e disponibile." -ForegroundColor Red
    Read-Host "Premi Invio per uscire"
    exit 1
}

# Ripristino e aggiornamento origini WinGet
Write-Host "Ripristino origini WinGet..."
winget source reset --force

if ($LASTEXITCODE -ne 0) {
    Write-Host "ATTENZIONE: ripristino origini non riuscito." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Aggiornamento origini WinGet..."
winget source update

if ($LASTEXITCODE -ne 0) {
    Write-Host "ATTENZIONE: aggiornamento origini non riuscito." -ForegroundColor Yellow
}

Write-Host ""
`;

    selectedApps.forEach(app => {
        // Protegge i valori inseriti nello script PowerShell
        const name = app.name.replace(/'/g, "''");
        const wingetId = app.wingetId.replace(/'/g, "''");

        ps1 += `
Write-Host "Installo ${name}..." -ForegroundColor Cyan

winget install --id '${wingetId}' --exact --source winget --accept-package-agreements --accept-source-agreements

if ($LASTEXITCODE -eq 0) {
    Write-Host "Installazione di ${name} completata." -ForegroundColor Green
} else {
    Write-Host "ERRORE: installazione di ${name} non riuscita (codice $LASTEXITCODE)." -ForegroundColor Red
}

Write-Host ""
`;
    });

    ps1 += `
Write-Host "DomeniInstaller ha finito."
Write-Host "======================="
Read-Host "Premi Invio per chiudere"
`;

    const blob = new Blob([ps1], {
        type: "text/plain;charset=utf-8"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "DomeniInstaller.ps1";

    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Rende disponibili le funzioni nell'HTML
window.LoadApps = LoadApps;
window.MakePS1 = MakePS1;

// Carica le applicazioni quando il DOM è pronto
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", LoadApps);
} else {
    LoadApps();
}