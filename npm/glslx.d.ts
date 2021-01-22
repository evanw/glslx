export type CompileInput = string | { name: string, contents: string } | { name: string, contents: string }[];
export type FileAccess = (filePath: string, relativeTo: string) => (null | string | { name: string, contents: string });

export interface CompileArgs {
  format?: 'json' | 'js' | 'c++' | 'skew' | 'rust'; // Default: 'json'
  renaming?: 'all' | 'internal-only' | 'none'; // Default: 'all'
  disableRewriting?: boolean; // Default: false
  prettyPrint?: boolean; // Default: false
  keepSymbols?: boolean; // Default: false
  fileAccess?: FileAccess; // For '#include'
}

export interface CompileResult {
  log: string;
  output: string | null;
}

export function compile(input: CompileInput, args?: CompileArgs): CompileResult;

export interface CompileArgsIDE {
  fileAccess?: FileAccess; // For '#include'
}

export interface LineColumn {
  line: number;
  column: number;
}

export interface Range {
  source: string;
  start: LineColumn;
  end: LineColumn;
}

export interface Diagnostic {
  kind: 'error' | 'warning';
  text: string;
  range: Range | null;
}

export interface TooltipRequest {
  id?: any;
  source: string;
  line: number;
  column: number;
  ignoreDiagnostics: boolean;
}

export interface TooltipResponse {
  type: 'tooltip-query';
  id?: any;
  source: string;
  tooltip: string;
  range: Range;
  symbol: string;
}

export interface DefinitionRequest {
  id?: any;
  source: string;
  line: number;
  column: number;
}

export interface DefinitionResponse {
  type: 'definition-query';
  id?: any;
  source: string;
  definition: Range;
  range: Range;
  symbol: string;
}

export interface SymbolsRequest {
  id?: any;
  source: string;
}

export interface SymbolsResponse {
  type: 'symbols-query';
  id?: any;
  source: string;
  symbols: Symbol[];
}

export interface Symbol {
  name: string;
  kind: 'variable' | 'function' | 'struct';
  range: Range;
}

export interface RenameRequest {
  id?: any;
  source: string;
  line: number;
  column: number;
}

export interface RenameResponse {
  type: 'rename-query';
  id?: any;
  source: string;
  ranges: Range[];
  symbol: string;
}

export interface CompileResultIDE {
  diagnostics: Diagnostic[];
  tooltipQuery(message: TooltipRequest): TooltipResponse;
  definitionQuery(message: DefinitionRequest): DefinitionResponse;
  symbolsQuery(message: SymbolsRequest): SymbolsResponse;
  renameQuery(message: RenameRequest): RenameResponse;
}

export function compileIDE(input: CompileInput, args?: CompileArgsIDE): CompileResultIDE;

export interface FormatArgs {
  indent?: string; // Default: '  '
  newline?: string; // Default: '\n'
  trailingNewline?: 'preserve' | 'remove' | 'insert'; // Default: 'insert'
}

export function format(input: string, args?: FormatArgs): string;
