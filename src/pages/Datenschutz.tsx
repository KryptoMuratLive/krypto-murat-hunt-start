import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Mail, Shield, Eye, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const Datenschutz = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Zurück zur Startseite
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-2">Datenschutzerklärung</h1>
          <p className="text-muted-foreground">Informationen zur Verarbeitung Ihrer Daten gemäß DSGVO</p>
        </div>

        <div className="grid gap-8 max-w-4xl">
          {/* Allgemeine Hinweise */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">Allgemeine Hinweise zur Datenverarbeitung</h2>
            </div>
            <div className="space-y-4 text-foreground">
              <p className="leading-relaxed">
                Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Diese Datenschutzerklärung informiert Sie darüber, welche Daten wir auf unserer Website kryptomurat.live erheben, wie wir diese verwenden und welche Rechte Sie bezüglich Ihrer Daten haben.
              </p>
              <p className="leading-relaxed">
                Diese Datenschutzerklärung gilt für alle Datenverarbeitungsvorgänge auf unserer Website, einschließlich der Web3-Funktionen wie Wallet-Connect und NFT-Verknüpfungen.
              </p>
            </div>
          </Card>

          {/* Verantwortlicher */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Verantwortlicher im Sinne der DSGVO</h2>
            <div className="space-y-2 text-foreground">
              <p className="font-medium">Murat Keskin</p>
              <p>Asper Straße 20</p>
              <p>32108 Bad Salzuflen</p>
              <p>Deutschland</p>
              <div className="flex items-center gap-2 mt-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>E-Mail: </span>
                <a href="mailto:info@kryptomur.at" className="text-primary hover:text-primary/80 transition-colors">
                  info@kryptomur.at
                </a>
              </div>
            </div>
          </Card>

          {/* Datenverarbeitung beim Website-Besuch */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">Datenverarbeitung beim Besuch der Website</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2 text-foreground">Server-Logs</h3>
                <p className="text-foreground leading-relaxed mb-2">
                  Bei jedem Besuch unserer Website werden automatisch Informationen in Server-Log-Dateien gespeichert, die Ihr Browser übermittelt:
                </p>
                <ul className="list-disc list-inside space-y-1 text-foreground ml-4">
                  <li>IP-Adresse des anfragenden Rechners</li>
                  <li>Datum und Uhrzeit des Zugriffs</li>
                  <li>Name und URL der abgerufenen Datei</li>
                  <li>Übertragene Datenmenge</li>
                  <li>Meldung über erfolgreichen Abruf</li>
                  <li>Browsertyp und Version</li>
                  <li>Betriebssystem des Nutzers</li>
                  <li>Referrer URL (die zuvor besuchte Seite)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2 text-foreground">Zweck der Datenverarbeitung</h3>
                <p className="text-foreground leading-relaxed">
                  Die Verarbeitung dieser Daten erfolgt zur Gewährleistung eines störungsfreien Verbindungsaufbaus der Website, zur Gewährleistung einer komfortablen Nutzung unserer Website, zur Auswertung der Systemsicherheit und -stabilität sowie zu weiteren administrativen Zwecken.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2 text-foreground">Rechtsgrundlage</h3>
                <p className="text-foreground leading-relaxed">
                  Die Rechtsgrundlage für die Datenverarbeitung ist Art. 6 Abs. 1 S. 1 lit. f DSGVO. Unser berechtigtes Interesse folgt aus oben aufgelisteten Zwecken zur Datenerhebung.
                </p>
              </div>
            </div>
          </Card>

          {/* Cookies */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Cookies und ähnliche Technologien</h2>
            <div className="space-y-4 text-foreground">
              <p className="leading-relaxed">
                Unsere Website verwendet Cookies, um die Funktionalität und Benutzerfreundlichkeit zu verbessern. Cookies sind kleine Textdateien, die auf Ihrem Gerät gespeichert werden.
              </p>
              <div>
                <h3 className="text-lg font-medium mb-2">Arten von Cookies:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Technisch notwendige Cookies:</strong> Für die Grundfunktionen der Website erforderlich</li>
                  <li><strong>Funktionale Cookies:</strong> Zur Speicherung von Einstellungen und Präferenzen</li>
                  <li><strong>Wallet-Connect Cookies:</strong> Zur Aufrechterhaltung der Wallet-Verbindung</li>
                </ul>
              </div>
              <p className="leading-relaxed">
                Sie können Cookies in Ihren Browsereinstellungen verwalten oder deaktivieren. Bitte beachten Sie, dass die Deaktivierung bestimmter Cookies die Funktionalität der Website beeinträchtigen kann.
              </p>
            </div>
          </Card>

          {/* Web3 und Wallet-Funktionen */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">Web3-Funktionen und Wallet-Integration</h2>
            </div>
            <div className="space-y-4 text-foreground">
              <div>
                <h3 className="text-lg font-medium mb-2">WalletConnect und Wallet-Verknüpfung</h3>
                <p className="leading-relaxed mb-2">
                  Für die Nutzung der Web3-Funktionen unserer Plattform können Sie Ihre Krypto-Wallet verbinden. Dabei werden folgende Daten verarbeitet:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Öffentliche Wallet-Adresse</li>
                  <li>Signierte Nachrichten zur Authentifizierung</li>
                  <li>NFT-Besitzstände (zur Verifikation von Zugriffsrechten)</li>
                  <li>Transaktionshistorie (soweit öffentlich verfügbar)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Zweck der Verarbeitung</h3>
                <p className="leading-relaxed">
                  Die Wallet-Adresse wird gespeichert, um Ihnen personalisierten Zugang zu Inhalten zu gewähren und Ihre NFT-Berechtigung zu verifizieren. Diese Daten ermöglichen es uns, Ihnen die entsprechenden Funktionen und Inhalte der Plattform zur Verfügung zu stellen.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Blockchain-Transparenz</h3>
                <p className="leading-relaxed">
                  Bitte beachten Sie, dass Blockchain-Transaktionen öffentlich und unveränderlich sind. Ihre Wallet-Adresse und zugehörige Transaktionen sind in der Blockchain öffentlich einsehbar.
                </p>
              </div>
            </div>
          </Card>

          {/* Drittanbieter-Services */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Nutzung von Drittanbieter-Services</h2>
            <div className="space-y-4 text-foreground">
              <p className="leading-relaxed">
                Unsere Website nutzt verschiedene Drittanbieter-Services zur Bereitstellung von Funktionen:
              </p>
              
              <div className="space-y-3">
                <div>
                  <h3 className="font-medium">Thirdweb (Web3-Infrastruktur)</h3>
                  <p className="text-sm text-muted-foreground">
                    Für NFT-Funktionen und Smart Contract-Interaktionen. Datenübertragung in die USA möglich.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium">WalletConnect (Wallet-Integration)</h3>
                  <p className="text-sm text-muted-foreground">
                    Für die sichere Verbindung mit Krypto-Wallets. Temporäre Speicherung von Verbindungsdaten.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium">Livepeer (Video-Streaming)</h3>
                  <p className="text-sm text-muted-foreground">
                    Für Live-Streaming-Funktionen. Mögliche Datenübertragung in Drittländer.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium">Weitere APIs und Services</h3>
                  <p className="text-sm text-muted-foreground">
                    Je nach Funktionsumfang können weitere Drittanbieter-APIs eingesetzt werden.
                  </p>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Datenübertragung in Drittstaaten</h3>
                <p className="text-sm leading-relaxed">
                  Bei der Nutzung von Drittanbieter-Services kann es zu Datenübertragungen in Länder außerhalb der EU/EWR kommen. Diese erfolgen auf Grundlage von Angemessenheitsbeschlüssen der EU-Kommission oder geeigneten Garantien gemäß Art. 44 ff. DSGVO.
                </p>
              </div>
            </div>
          </Card>

          {/* Betroffenenrechte */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Ihre Rechte als betroffene Person</h2>
            <div className="space-y-4 text-foreground">
              <p className="leading-relaxed">
                Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:
              </p>
              
              <div className="grid gap-3">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-medium">Recht auf Auskunft (Art. 15 DSGVO)</h3>
                  <p className="text-sm text-muted-foreground">
                    Sie haben das Recht, Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten zu verlangen.
                  </p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-medium">Recht auf Berichtigung (Art. 16 DSGVO)</h3>
                  <p className="text-sm text-muted-foreground">
                    Sie haben das Recht, unverzüglich die Berichtigung Sie betreffender unrichtiger Daten zu verlangen.
                  </p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-medium">Recht auf Löschung (Art. 17 DSGVO)</h3>
                  <p className="text-sm text-muted-foreground">
                    Sie haben das Recht, die unverzügliche Löschung Sie betreffender Daten zu verlangen.
                  </p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-medium">Recht auf Einschränkung (Art. 18 DSGVO)</h3>
                  <p className="text-sm text-muted-foreground">
                    Sie haben das Recht, die Einschränkung der Verarbeitung zu verlangen.
                  </p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-medium">Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</h3>
                  <p className="text-sm text-muted-foreground">
                    Sie haben das Recht, Ihre Daten in einem strukturierten, maschinenlesbaren Format zu erhalten.
                  </p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-medium">Widerspruchsrecht (Art. 21 DSGVO)</h3>
                  <p className="text-sm text-muted-foreground">
                    Sie haben das Recht, jederzeit gegen die Verarbeitung Ihrer Daten Widerspruch einzulegen.
                  </p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-medium">Recht auf Widerruf (Art. 7 DSGVO)</h3>
                  <p className="text-sm text-muted-foreground">
                    Sie haben das Recht, erteilte Einwilligungen jederzeit zu widerrufen.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Speicherdauer */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Dauer der Speicherung</h2>
            <div className="space-y-4 text-foreground">
              <div>
                <h3 className="text-lg font-medium mb-2">Allgemeine Speicherdauer</h3>
                <p className="leading-relaxed">
                  Wir speichern personenbezogene Daten nur so lange, wie es für die Erfüllung der Zwecke erforderlich ist, für die sie erhoben wurden, oder wie es gesetzliche Aufbewahrungsfristen vorsehen.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Spezifische Speicherfristen</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Server-Logs:</strong> 7 Tage (aus Sicherheitsgründen)</li>
                  <li><strong>Wallet-Adressen:</strong> Bis zur Löschung des Accounts oder auf Widerruf</li>
                  <li><strong>Cookies:</strong> Je nach Cookie-Typ zwischen Sitzungsende und 12 Monaten</li>
                  <li><strong>NFT-Verifikationsdaten:</strong> Solange NFT im Besitz oder bis zur Löschungsanfrage</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Datensicherheit */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Datensicherheit</h2>
            <div className="space-y-4 text-foreground">
              <p className="leading-relaxed">
                Wir verwenden geeignete technische und organisatorische Sicherheitsmaßnahmen, um Ihre Daten gegen zufällige oder vorsätzliche Manipulationen, teilweisen oder vollständigen Verlust, Zerstörung oder gegen den unbefugten Zugriff Dritter zu schützen.
              </p>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Sicherheitsmaßnahmen</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>SSL/TLS-Verschlüsselung für alle Datenübertragungen</li>
                  <li>Sichere Speicherung auf geschützten Servern</li>
                  <li>Regelmäßige Sicherheitsupdates</li>
                  <li>Zugriffskontrollen und Authentifizierung</li>
                  <li>Backup- und Recovery-Verfahren</li>
                </ul>
              </div>
              
              <p className="leading-relaxed">
                Unsere Sicherheitsmaßnahmen werden entsprechend der technologischen Entwicklung fortlaufend verbessert.
              </p>
            </div>
          </Card>

          {/* Kontakt für Datenschutzanfragen */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Kontakt für Datenschutzanfragen</h2>
            <div className="space-y-4 text-foreground">
              <p className="leading-relaxed">
                Für Fragen zum Datenschutz, zur Ausübung Ihrer Rechte oder bei Beschwerden können Sie sich jederzeit an uns wenden:
              </p>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="space-y-2">
                  <p className="font-medium">Murat Keskin</p>
                  <p>Asper Straße 20</p>
                  <p>32108 Bad Salzuflen</p>
                  <div className="flex items-center gap-2 mt-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>E-Mail: </span>
                    <a href="mailto:info@kryptomur.at" className="text-primary hover:text-primary/80 transition-colors">
                      info@kryptomur.at
                    </a>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Wir werden Ihre Anfrage unverzüglich und in der Regel innerhalb eines Monats bearbeiten.
              </p>
            </div>
          </Card>

          {/* Beschwerderecht */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Beschwerderecht bei der Aufsichtsbehörde</h2>
            <div className="space-y-4 text-foreground">
              <p className="leading-relaxed">
                Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten durch uns zu beschweren.
              </p>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Zuständige Aufsichtsbehörde für Nordrhein-Westfalen:</h3>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="font-medium">Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen</p>
                  <p>Kavalleriestraße 2-4</p>
                  <p>40213 Düsseldorf</p>
                  <p className="mt-2">
                    Website: <a href="https://www.ldi.nrw.de" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors">www.ldi.nrw.de</a>
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Änderungen */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Änderungen dieser Datenschutzerklärung</h2>
            <div className="space-y-4 text-foreground">
              <p className="leading-relaxed">
                Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen.
              </p>
              <p className="leading-relaxed">
                Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung. Wir empfehlen Ihnen, diese Datenschutzerklärung regelmäßig zu lesen, um über den Schutz Ihrer Daten informiert zu bleiben.
              </p>
            </div>
          </Card>

          {/* Stand der Erklärung */}
          <Card className="p-4 bg-muted/50">
            <p className="text-sm text-muted-foreground text-center">
              Stand dieser Datenschutzerklärung: {new Date().toLocaleDateString('de-DE')}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Datenschutz;