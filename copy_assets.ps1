$dest = "C:\Users\Raul\.gemini\antigravity\scratch\the-original-tavern\assets"
$src = "C:\Users\Raul\.gemini\antigravity\brain\94939882-7459-41fa-b80f-d841d0fb3aba"

Write-Host "Creating assets directory..."
New-Item -ItemType Directory -Force -Path $dest

Write-Host "Copying bar-mezzanine..."
Copy-Item -Path "$src\media__1779396231378.png" -Destination "$dest\bar-mezzanine.png" -Force

Write-Host "Copying dining-room..."
Copy-Item -Path "$src\media__1779396240723.png" -Destination "$dest\dining-room.png" -Force

Write-Host "Copying dining-clock..."
Copy-Item -Path "$src\media__1779396248035.png" -Destination "$dest\dining-clock.png" -Force

Write-Host "Copying moss-logo..."
Copy-Item -Path "$src\media__1779396254456.png" -Destination "$dest\moss-logo.png" -Force

Write-Host "Copying bar-stairs..."
Copy-Item -Path "$src\media__1779396263057.png" -Destination "$dest\bar-stairs.png" -Force

Write-Host "Verifying files in assets folder:"
Get-ChildItem -Path $dest
