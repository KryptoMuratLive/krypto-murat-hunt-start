import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Impressum = () => {
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
          <h1 className="text-4xl font-bold text-foreground mb-2">Impressum</h1>
          <p className="text-muted-foreground">Rechtliche Angaben gemäß § 5 TMG</p>
        </div>

        <div className="grid gap-8 max-w-4xl">
          {/* Angaben gemäß § 5 TMG */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Angaben gemäß § 5 TMG</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-foreground mb-2">Inhaber und Betreiber</h3>
                <p className="text-foreground">Murat Keskin</p>
              </div>
              
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 text-muted-foreground flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-foreground mb-1">Anschrift</h3>
                  <p className="text-foreground">Asper Strasse 20</p>
                  <p className="text-foreground">32108 Bad Salzuflen</p>
                  <p className="text-foreground">Deutschland</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <span className="font-medium text-foreground">E-Mail: </span>
                    <a href="mailto:info@kryptomur.at" className="text-primary hover:text-primary/80 transition-colors">
                      info@kryptomur.at
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <span className="font-medium text-foreground">Telefon: </span>
                    <a href="tel:+491627230013" className="text-primary hover:text-primary/80 transition-colors">
                      +49 162 7230013
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-foreground mb-2">Umsatzsteuer</h3>
                <p className="text-foreground">Kleingewerbe nach § 19 UStG (Umsatzsteuerbefreiung)</p>
              </div>
            </div>
          </Card>

          {/* Verantwortlicher für den Inhalt */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Verantwortlich für den Inhalt</h2>
            <p className="text-foreground">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</p>
            <div className="mt-2">
              <p className="text-foreground font-medium">Murat Keskin</p>
              <p className="text-foreground">Asper Strasse 20</p>
              <p className="text-foreground">32108 Bad Salzuflen</p>
            </div>
          </Card>

          {/* Haftungsausschluss */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Haftungsausschluss</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2 text-foreground">Haftung für Inhalte</h3>
                <p className="text-foreground leading-relaxed">
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                </p>
                <p className="text-foreground leading-relaxed mt-2">
                  Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2 text-foreground">Haftung für Links</h3>
                <p className="text-foreground leading-relaxed">
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
                </p>
                <p className="text-foreground leading-relaxed mt-2">
                  Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2 text-foreground">Urheberrecht</h3>
                <p className="text-foreground leading-relaxed">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
                </p>
                <p className="text-foreground leading-relaxed mt-2">
                  Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
                </p>
              </div>
            </div>
          </Card>

          {/* Datenschutz */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Datenschutz</h2>
            <p className="text-foreground leading-relaxed">
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>
            <p className="text-foreground leading-relaxed mt-2">
              Die Nutzung unserer Website ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.
            </p>
          </Card>

          {/* Online-Streitbeilegung */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Online-Streitbeilegung</h2>
            <p className="text-foreground leading-relaxed">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
              <a 
                href="https://ec.europa.eu/consumers/odr/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary hover:text-primary/80 transition-colors ml-1"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
            </p>
            <p className="text-foreground leading-relaxed mt-2">
              Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </Card>

          {/* Letzte Aktualisierung */}
          <Card className="p-4 bg-muted/50">
            <p className="text-sm text-muted-foreground text-center">
              Letzte Aktualisierung: {new Date().toLocaleDateString('de-DE')}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Impressum;