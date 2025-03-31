export interface Component {
    file: string;
    componentName: string;
    routeName: string;
  }
  
export interface OutputFile {
    file: string;
    size: string;
    createdAt: string;
  }
  
export interface ExportOptions {
    width: number;
    widthPreset: string;
    margin: number;
    format: 'auto' | 'a4' | 'a3';
    debug: boolean;
  }

export interface GenerateWithClaudeProps {
    onComponentGenerated: (componentName: string, tsxCode: string) => void;
    apiUrl: string;
  }

export interface PreviewPaneProps {
    selectedComponents: Component[];
  }