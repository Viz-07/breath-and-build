import { useState, useEffect } from "react";
import { Settings, Key, Check, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { initializeOpenAI } from "@/lib/openai";
import { useToast } from "@/hooks/use-toast";

const OpenAISettings = () => {
  const [apiKey, setApiKey] = useState("");
  const [isConfigured, setIsConfigured] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedKey = localStorage.getItem('openai_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      setIsConfigured(true);
      initializeOpenAI(savedKey);
    }
  }, []);

  const handleSaveKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive"
      });
      return;
    }

    try {
      localStorage.setItem('openai_api_key', apiKey);
      initializeOpenAI(apiKey);
      setIsConfigured(true);
      setIsOpen(false);
      toast({
        title: "Success",
        description: "OpenAI API key saved successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to configure OpenAI API",
        variant: "destructive"
      });
    }
  };

  const handleRemoveKey = () => {
    localStorage.removeItem('openai_api_key');
    setApiKey("");
    setIsConfigured(false);
    toast({
      title: "Success",
      description: "OpenAI API key removed"
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className={`border-border/50 ${isConfigured ? 'text-success hover:bg-success/10' : 'text-warning hover:bg-warning/10'}`}
        >
          {isConfigured ? <Check className="w-4 h-4 mr-2" /> : <Key className="w-4 h-4 mr-2" />}
          {isConfigured ? 'AI Configured' : 'Setup AI'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            OpenAI Configuration
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="apiKey">OpenAI API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Get your API key from{" "}
              <a 
                href="https://platform.openai.com/api-keys" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                OpenAI Platform
              </a>
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Button onClick={handleSaveKey} className="flex-1">
              Save Configuration
            </Button>
            {isConfigured && (
              <Button 
                variant="outline" 
                onClick={handleRemoveKey}
                className="border-destructive/30 text-destructive hover:bg-destructive/10"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          <Card className="p-3 bg-muted/30">
            <p className="text-xs text-muted-foreground">
              <strong>Note:</strong> Your API key is stored locally in your browser. 
              For production use, API calls should be made through a secure backend server.
            </p>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OpenAISettings;