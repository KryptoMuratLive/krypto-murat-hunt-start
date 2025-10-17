import { Button } from "@/components/ui/button";
import { Share2, Twitter, Facebook, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SocialShareProps {
  title: string;
  description?: string;
  url?: string;
}

export const SocialShare = ({ title, description, url }: SocialShareProps) => {
  const shareUrl = url || window.location.href;
  const shareText = description || title;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link kopiert!", {
        description: "Der Link wurde in die Zwischenablage kopiert."
      });
    } catch (error) {
      toast.error("Fehler beim Kopieren", {
        description: "Link konnte nicht kopiert werden."
      });
    }
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
    toast.success("Twitter geöffnet", {
      description: "Teile jetzt auf Twitter!"
    });
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, '_blank', 'width=550,height=420');
    toast.success("Facebook geöffnet", {
      description: "Teile jetzt auf Facebook!"
    });
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: shareText,
          url: shareUrl,
        });
        toast.success("Erfolgreich geteilt!");
      } catch (error) {
        // User cancelled or error occurred
        console.log('Share cancelled');
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Share2 className="w-4 h-4 mr-2" />
          Teilen
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {navigator.share && (
          <DropdownMenuItem onClick={handleNativeShare}>
            <Share2 className="w-4 h-4 mr-2" />
            Teilen...
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={handleTwitterShare}>
          <Twitter className="w-4 h-4 mr-2" />
          Auf Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleFacebookShare}>
          <Facebook className="w-4 h-4 mr-2" />
          Auf Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyLink}>
          <LinkIcon className="w-4 h-4 mr-2" />
          Link kopieren
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
