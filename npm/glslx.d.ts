type CompileInput = string | { name: string, contents: string } | { name: string, contents: string }[];
type FileAccess = (filePath: string, relativeTo: string) => (null | string | { name: string, contents: string });

interface CompileArgs {
  format?: 'json' | 'js' | 'c++' | 'skew' | 'rust'; // Default: 'json'
  renaming?: 'all' | 'internal-only' | 'none'; // Default: 'all'
  disableRewriting?: boolean; // Default: false
  prettyPrint?: boolean; // Default: false
  keepSymbols?: boolean; // Default: false
  fileAccess?: FileAccess; // For '#include'
}

export function compile(input: CompileInput, args?: CompileArgs): {
  log: string;
  output: string | null;
};

interface CompileArgsIDE {
  fileAccess?: FileAccess; // For '#include'
}

interface LineColumn {
  line: number;
  column: number;
}

interface Range {
  source: string;
  start: LineColumn;
  end: LineColumn;
}

export function compileIDE(input: CompileInput, args?: CompileArgsIDE): {
  diagnostics: {
    kind: 'error' | 'warning';
    text: string;
    range: Range | null;
  }[];

  tooltipQuery(message: {
    id: any;
    source: string;
    line: number;
    column: number;
    ignoreDiagnostics: boolean;
  }): {
    type: 'tooltip-query';
    id: any;
    source: string;
    tooltip: string;
    range: Range;
    symbol: string;
  };

  definitionQuery(message: {
    id: any;
    source: string;
    line: number;
    column: number;
  }): {
    type: 'definition-query';
    id: any;
    source: string;
    definition: Range;
    range: Range;
    symbol: string;
  };

  symbolsQuery(message: {
    id: any;
    source: string;
  }): {
    type: 'symbols-query';
    id: any;
    source: string;
    symbols: {
      name: string;
      kind: 'variable' | 'function' | 'struct';
      range: Range;
    }[];
  };

  renameQuery(message: {
    id: any;
    source: string;
    line: number;
    column: number;
  }): {
    type: 'rename-query';
    id: any;
    source: string;
    ranges: Range[];
    symbol: string;
  };
};

interface FormatArgs {
  indent?: string; // Default: '  '
  newline?: string; // Default: '\n'
  trailingNewline?: 'preserve' | 'remove' | 'insert'; // Default: 'insert'
}

export function format(input: string, args?: FormatArgs): string;
