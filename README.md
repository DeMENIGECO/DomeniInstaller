# DomeniInstaller

DomeniInstaller è una web application che semplifica l'installazione delle applicazioni su Windows, consentendo di selezionare i software desiderati e generare automaticamente uno script PowerShell per installarli.

L'obiettivo del progetto è rendere la configurazione di un nuovo sistema più rapida ed efficiente, riducendo la necessità di scaricare ed eseguire manualmente numerosi programmi di installazione.

**Sito ufficiale:** https://demenigeco.github.io/DomeniInstaller

## Funzionamento

DomeniInstaller consente di generare uno script PowerShell personalizzato in base alle applicazioni selezionate dall'utente.

1. Visita il [sito ufficiale](https://demenigeco.github.io/DomeniInstaller).
2. Seleziona le applicazioni che desideri installare.
3. Fai clic su **Genera Il mio DomeniInstaller**.
4. Scarica il file `DomeniInstaller.ps1` generato dal sito.
5. Esegui lo script tramite PowerShell per avviare l'installazione delle applicazioni selezionate.

## Requisiti

- Sistema operativo Windows.
- PowerShell.
- WinGet installato e funzionante.

Per maggiori informazioni su WinGet, consulta la [documentazione ufficiale Microsoft](https://learn.microsoft.com/it-it/windows/package-manager/winget/).

## Esecuzione

Dopo aver scaricato `DomeniInstaller.ps1`, apri PowerShell come amministratore e raggiungi la directory contenente il file.

Se il file si trova nella cartella Download, esegui:

    cd "$HOME\Downloads"

Successivamente, avvia lo script con il comando:

    .\DomeniInstaller.ps1

Attendi il completamento delle operazioni. I tempi di installazione possono variare in base alle applicazioni selezionate e alla connessione Internet.

**Nota sulla sicurezza:** prima di eseguire lo script, verifica il suo contenuto e assicurati che provenga da una fonte attendibile. L'esecuzione con privilegi di amministratore deve essere limitata agli script di cui ti fidi.

## Risoluzione dei problemi

### Errore WinGet `0x8a15000f`

Se durante l'installazione si verifica l'errore `0x8a15000f`, prova a registrare nuovamente il pacchetto di WinGet.

Apri PowerShell ed esegui il seguente comando:

    Add-AppxPackage -RegisterByFamilyName -MainPackage Microsoft.Winget.Source_8wekyb3d8bbwe

Al termine dell'operazione, riprova a eseguire lo script.

Se il problema persiste, verifica che WinGet sia installato correttamente e aggiornato.

## Compatibilità

Attualmente, DomeniInstaller supporta Windows. Le installazioni dipendono dalla disponibilità di WinGet e dai requisiti specifici delle applicazioni selezionate.

## Autore

Progetto sviluppato da [DomeniGeco](https://github.com/DomeniGeco).

## Link utili

- [Sito ufficiale](https://demenigeco.github.io/DomeniInstaller)
- [Repository GitHub](https://github.com/DomeniGeco/DomeniInstaller)
- [Documentazione WinGet](https://learn.microsoft.com/it-it/windows/package-manager/winget/)
