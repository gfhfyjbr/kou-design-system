import { type KouAccount, type KouAliasRow, type KouApiKeyRow, type KouAuthStatus, type KouBoardEvent, type KouDropdownOption, type KouLogDetail, type KouLogRow, type KouMode, type KouModelInfo, type KouPreset, type KouProvider, type KouProviderAccountAction, type KouProviderSignal, type KouViewName } from './types';
export declare function KouRail({ view, mode, onNavigate, version, }: {
    view: KouViewName;
    mode: KouMode;
    onNavigate: (view: KouViewName) => void;
    version?: string;
}): import("react").JSX.Element;
export declare function KouTopBar({ view, mode, showAuthButton, onSignOut, }: {
    view: KouViewName;
    mode: KouMode;
    showAuthButton: boolean;
    onSignOut: () => void;
}): import("react").JSX.Element;
export declare function KouGateScreen({ error, onSubmit, }: {
    error: string;
    onSubmit: (password: string) => void | Promise<void>;
}): import("react").JSX.Element;
export declare function KouDeparturesBoard({ rows, mode, animate, }: {
    rows: KouBoardEvent[];
    mode: KouMode;
    animate: boolean;
}): import("react").JSX.Element;
export declare function KouIngressChips({ url, onCopy }: {
    url: string;
    onCopy: () => void;
}): import("react").JSX.Element;
export interface KouSignalRow {
    id: string;
    name: string;
    color: string;
    signal: KouProviderSignal;
}
export declare function KouSignals({ rows }: {
    rows: KouSignalRow[];
}): import("react").JSX.Element;
export interface KouStatTile {
    label: string;
    kana: string;
    value: number | null;
    accent?: boolean;
    go: KouViewName;
}
export declare function KouStatsStrip({ tiles, onNavigate, }: {
    tiles: KouStatTile[];
    onNavigate: (view: KouViewName) => void;
}): import("react").JSX.Element;
export declare function KouSwitchyard({ providers, accounts, authed, demo, mode, onNavigate, onFlashProvider, onAddLine, getSignal, }: {
    providers: KouProvider[];
    accounts: Record<string, KouAccount[]>;
    authed: boolean;
    demo: boolean;
    mode: KouMode;
    onNavigate: (view: KouViewName) => void;
    onFlashProvider: (providerId: string) => void;
    onAddLine: () => void;
    getSignal: (provider: KouProvider) => KouProviderSignal;
}): import("react").JSX.Element;
export declare function KouAmbience(): import("react").JSX.Element;
export declare function KouProvidersView({ providers, accounts, authed, demo, flashProviderId, onImportPreset, onConnect, onAccountAction, getSignal, }: {
    providers: KouProvider[];
    accounts: Record<string, KouAccount[]>;
    authed: boolean;
    demo: boolean;
    flashProviderId: string | null;
    onImportPreset: () => void;
    onConnect: (providerId: string) => void;
    onAccountAction: (action: KouProviderAccountAction, account: KouAccount) => void;
    getSignal: (provider: KouProvider) => KouProviderSignal;
}): import("react").JSX.Element;
export declare function KouImportLineModal({ open, selected, available, name, prefix, onPresetChange, onNameChange, onPrefixChange, onClose, onImport, }: {
    open: boolean;
    selected: string;
    available: KouPreset[];
    name: string;
    prefix: string;
    onPresetChange: (value: string) => void;
    onNameChange: (value: string) => void;
    onPrefixChange: (value: string) => void;
    onClose: () => void;
    onImport: () => void;
}): import("react").JSX.Element;
export declare function KouConnectAccountModal({ open, authMode, label, redirect, defaultRedirect, proxy, code, apiKey, sessionActive, onAuthModeChange, onLabelChange, onRedirectChange, onProxyChange, onCodeChange, onApiKeyChange, onClose, onSubmit, }: {
    open: boolean;
    authMode: 'oauth' | 'api_key';
    label: string;
    redirect: string | null;
    defaultRedirect: string;
    proxy: string;
    code: string;
    apiKey: string;
    sessionActive: boolean;
    onAuthModeChange: (value: 'oauth' | 'api_key') => void;
    onLabelChange: (value: string) => void;
    onRedirectChange: (value: string) => void;
    onProxyChange: (value: string) => void;
    onCodeChange: (value: string) => void;
    onApiKeyChange: (value: string) => void;
    onClose: () => void;
    onSubmit: () => void;
}): import("react").JSX.Element;
export declare function KouKeysView({ keys, authed, name, selectedModels, modelOptions, newKey, onNameChange, onSelectedModelsChange, onCreate, onRevoke, onCloseNewKey, onCopyNewKey, }: {
    keys: KouApiKeyRow[];
    authed: boolean;
    name: string;
    selectedModels: string[];
    modelOptions: KouDropdownOption[];
    newKey: string | null;
    onNameChange: (value: string) => void;
    onSelectedModelsChange: (values: string[]) => void;
    onCreate: () => void;
    onRevoke: (key: KouApiKeyRow) => void;
    onCloseNewKey: () => void;
    onCopyNewKey: () => void;
}): import("react").JSX.Element;
export declare function KouModelsView({ models, aliases, alias, target, onAliasChange, onTargetChange, onAddAlias, }: {
    models: KouModelInfo[];
    aliases: KouAliasRow[];
    alias: string;
    target: string;
    onAliasChange: (value: string) => void;
    onTargetChange: (value: string) => void;
    onAddAlias: () => void;
}): import("react").JSX.Element;
export declare function KouLogsView({ logs, providers, authed, detail, onRefresh, onClean, onOpenLog, onCloseDetail, }: {
    logs: KouLogRow[] | null;
    providers: KouProvider[];
    authed: boolean;
    detail: KouLogDetail | null;
    onRefresh: () => void;
    onClean: () => void;
    onOpenLog: (row: KouLogRow) => void;
    onCloseDetail: () => void;
}): import("react").JSX.Element;
export declare function KouSettingsView({ demo, authed, authStatus, settingsJson, onSettingsJsonChange, onSave, onSignOut, }: {
    demo: boolean;
    authed: boolean;
    authStatus: KouAuthStatus | null;
    settingsJson: string;
    onSettingsJsonChange: (value: string) => void;
    onSave: () => void;
    onSignOut: () => void;
}): import("react").JSX.Element;
//# sourceMappingURL=views.d.ts.map