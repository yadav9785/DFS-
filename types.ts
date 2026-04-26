export interface Block {
  id: string;
  parentId: string; // ID of the file it belongs to
  index: number;    // Sequence number
  color: string;    // Visual color for the file
}

export interface DataNode {
  id: string;
  name: string;
  status: 'active' | 'dead';
  blocks: Block[];
  lastHeartbeat: number;
}

export interface FileMetadata {
  id: string;
  name: string;
  blocks: Block[];
  replicationFactor: number;
  uploadStatus: 'uploading' | 'complete';
}

export interface SystemLog {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'error' | 'success' | 'warning';
}

export interface SystemState {
  nodes: DataNode[];
  files: FileMetadata[];
  logs: SystemLog[];
  isAutoReplicationEnabled: boolean;
}