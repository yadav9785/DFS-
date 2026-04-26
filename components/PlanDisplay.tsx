import React from 'react';
import { DataNode, FileMetadata, Block, SystemLog } from '../types';
import { Server, Database, Activity, AlertTriangle, CheckCircle, FileText, RefreshCw, Plus, Trash2, Power, Hexagon, ShieldCheck, Cpu, HardDrive } from 'lucide-react';

interface DFSVisualizerProps {
  nodes: DataNode[];
  files: FileMetadata[];
  logs: SystemLog[];
  onToggleNode: (id: string) => void;
  onAddNode: () => void;
  onDeleteFile: (id: string) => void;
}

export const DFSVisualizer: React.FC<DFSVisualizerProps> = ({ 
  nodes, 
  files, 
  logs, 
  onToggleNode, 
  onAddNode,
  onDeleteFile
}) => {
  
  const getBlockHealth = (blockId: string, requiredReplicas: number) => {
    let activeReplicaCount = 0;
    nodes.forEach(node => {
      if (node.status === 'active' && node.blocks.some(b => b.id === blockId)) {
        activeReplicaCount++;
      }
    });

    if (activeReplicaCount === 0) return 'critical'; 
    if (activeReplicaCount < requiredReplicas) return 'warning'; 
    return 'healthy';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-20">
      
      {/* LEFT COLUMN: Master Node / Metadata Service */}
      <div className="lg:col-span-4 space-y-6">
        {/* NameNode Card with Glass Effect */}
        <div className="relative group perspective-1000">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-xl border border-slate-700/50 overflow-hidden shadow-2xl transform transition-transform hover:scale-[1.01] duration-300">
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-5 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-cyan-500/10 rounded-lg border border-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.1)]">
                  <Cpu className="text-cyan-400" size={20} />
                </div>
                <div>
                  <h2 className="font-tech font-bold text-lg tracking-wide text-white">NameNode <span className="text-cyan-400">Master</span></h2>
                  <p className="text-[10px] text-cyan-300/60 uppercase tracking-widest font-mono">Metadata Controller</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-bold text-emerald-400 tracking-wide font-mono">ONLINE</span>
              </div>
            </div>
            
            <div className="p-5 space-y-6">
              <div>
                <div className="flex justify-between items-end mb-4">
                   <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                     <Database size={12} className="text-slate-500" />
                     File Namespace
                   </h3>
                   <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-200 border border-slate-700">
                     {files.length} Object(s)
                   </span>
                </div>
                
                {files.length === 0 ? (
                  <div className="text-center py-12 bg-slate-800/30 rounded-xl border border-dashed border-slate-700/50 group-hover:border-slate-600 transition-colors">
                    <div className="w-12 h-12 mx-auto bg-slate-800 rounded-full flex items-center justify-center mb-3">
                      <Database className="text-slate-500" size={20} />
                    </div>
                    <p className="text-sm text-slate-400 font-medium">Namespace Empty</p>
                    <p className="text-xs text-slate-600 mt-1">Upload files to initialize blocks</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                    {files.map(file => (
                      <div key={file.id} className="group/file bg-slate-800/40 hover:bg-slate-800/80 rounded-lg border border-slate-700/50 p-3 transition-all hover:border-cyan-500/30">
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center gap-3">
                            <div className="p-1.5 bg-indigo-500/20 rounded text-indigo-400">
                              <FileText size={14} />
                            </div>
                            <div>
                              <div className="font-semibold text-sm text-slate-200 group-hover/file:text-white transition-colors">{file.name}</div>
                              <div className="text-[10px] text-slate-500 font-mono">{file.id}</div>
                            </div>
                          </div>
                          <button 
                            onClick={() => onDeleteFile(file.id)}
                            className="p-1.5 hover:bg-red-500/20 rounded-md text-slate-500 hover:text-red-400 transition-colors opacity-0 group-hover/file:opacity-100"
                            title="Delete File"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-1.5 pl-9">
                          {file.blocks.map((block, idx) => {
                            const health = getBlockHealth(block.id, file.replicationFactor);
                            return (
                              <div 
                                key={idx}
                                className={`
                                  text-[10px] font-mono px-2 py-1 rounded border flex items-center gap-1.5 shadow-sm transition-all
                                  ${health === 'healthy' ? 'bg-slate-900 border-slate-600 text-slate-300 hover:border-slate-500' : ''}
                                  ${health === 'warning' ? 'bg-amber-900/30 border-amber-500/50 text-amber-500 animate-pulse' : ''}
                                  ${health === 'critical' ? 'bg-red-900/30 border-red-500/50 text-red-500 font-bold' : ''}
                                `}
                                title={`Block ${idx}: ${health} replication`}
                              >
                                <div className={`w-1.5 h-1.5 rounded-sm ${block.color} shadow-[0_0_5px_currentColor]`}></div>
                                B{idx}
                                {health === 'warning' && <RefreshCw size={8} className="animate-spin" />}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* System Logs */}
        <div className="bg-slate-900/90 backdrop-blur-xl rounded-xl border border-slate-700/50 overflow-hidden flex flex-col h-[350px] shadow-lg">
          <div className="bg-slate-800/50 p-3 border-b border-slate-700 flex justify-between items-center">
            <h3 className="font-tech font-bold text-sm text-cyan-100 flex items-center gap-2">
              <Activity size={14} className="text-cyan-400" />
              Event Log
            </h3>
            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400 border border-slate-700 font-mono">LIVE FEED</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-xs bg-black/20 custom-scrollbar">
            {logs.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-slate-600 gap-2">
                <Activity size={24} className="opacity-20" />
                <p>Waiting for system events...</p>
              </div>
            )}
            {[...logs].reverse().map(log => (
              <div key={log.id} className="flex gap-3 animate-fade-in group hover:bg-white/5 p-1.5 rounded -mx-1 px-2 transition-colors border-l-2 border-transparent hover:border-slate-600">
                <span className="text-slate-600 flex-shrink-0 w-16 text-[10px] pt-0.5 opacity-70 group-hover:opacity-100 transition-opacity">
                  {log.timestamp}
                </span>
                <span className={`
                  flex-1 leading-relaxed
                  ${log.type === 'error' ? 'text-red-400 drop-shadow-[0_0_3px_rgba(248,113,113,0.3)]' : ''}
                  ${log.type === 'success' ? 'text-emerald-400' : ''}
                  ${log.type === 'warning' ? 'text-amber-400' : ''}
                  ${log.type === 'info' ? 'text-slate-300' : ''}
                `}>
                  {log.message}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Data Nodes */}
      <div className="lg:col-span-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
             <div className="p-2.5 bg-slate-800 rounded-lg border border-slate-700 shadow-md">
               <Server className="text-slate-400" size={24} />
             </div>
             <div>
               <h2 className="font-tech font-bold text-2xl text-white tracking-wide">Data Rack <span className="text-slate-600">01</span></h2>
               <div className="flex gap-2 text-xs text-slate-400 font-medium">
                  <span className="flex items-center gap-1.5"><ShieldCheck size={12} className="text-emerald-500" /> Fault Tolerance: High</span>
                  <span className="text-slate-700">|</span>
                  <span className="flex items-center gap-1.5"><Hexagon size={12} className="text-blue-500" /> Topology: Mesh</span>
               </div>
             </div>
          </div>
          <button 
            onClick={onAddNode}
            className="group flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:-translate-y-0.5 border border-blue-400/20 active:translate-y-0"
          >
            <Plus size={16} className="group-hover:rotate-90 transition-transform" /> 
            Add Node
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-1000">
          {nodes.map(node => (
            <div 
              key={node.id} 
              className={`
                iso-server relative rounded-xl border transition-all duration-300 min-h-[240px] flex flex-col preserve-3d group
                ${node.status === 'active' 
                  ? 'bg-slate-900 border-slate-700 shadow-xl hover:shadow-2xl hover:border-cyan-500/50 hover:shadow-cyan-900/20' 
                  : 'bg-red-950/20 border-red-900/30 opacity-80 grayscale-[0.5]'}
              `}
              style={{
                boxShadow: node.status === 'active' 
                  ? '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)' 
                  : 'none'
              }}
            >
              {/* LED Status Lights decoration */}
              {node.status === 'active' && (
                <div className="absolute top-4 right-14 flex gap-1">
                  <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse delay-75"></div>
                  <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse delay-150"></div>
                </div>
              )}

              {/* Top Face / Header */}
              <div className={`
                 p-4 border-b rounded-t-xl flex justify-between items-center relative overflow-hidden
                 ${node.status === 'active' ? 'bg-slate-800/80 border-slate-700' : 'bg-red-900/10 border-red-900/20'}
              `}>
                {node.status === 'active' && <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent pointer-events-none"></div>}
                
                <div className="flex items-center gap-3 relative z-10">
                  <div className="relative">
                    <div className={`
                      w-3 h-3 rounded-full 
                      ${node.status === 'active' ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-red-500 shadow-[0_0_10px_#ef4444]'}
                    `} />
                    {node.status === 'active' && <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75"></div>}
                  </div>
                  <div>
                    <h3 className={`font-tech font-bold tracking-wide text-sm ${node.status === 'active' ? 'text-slate-100' : 'text-red-400'}`}>
                      {node.name}
                    </h3>
                    <p className="text-[10px] text-slate-500 font-mono tracking-wider">{node.id}</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => onToggleNode(node.id)}
                  className={`
                    p-2 rounded-lg transition-all active:scale-95 relative z-10
                    ${node.status === 'active' 
                      ? 'text-slate-500 hover:text-red-400 hover:bg-red-500/10' 
                      : 'text-red-400 bg-red-500/10 hover:bg-emerald-500/20 hover:text-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]'}
                  `}
                  title={node.status === 'active' ? "Simulate Failure" : "Reboot Node"}
                >
                  <Power size={16} />
                </button>
              </div>

              {/* Side/Front Face / Content */}
              <div className="flex-1 p-4 relative">
                 <div className="flex justify-between items-center mb-3">
                   <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest flex items-center gap-1.5">
                     <HardDrive size={10} /> Storage
                   </span>
                   <span className="text-[10px] font-mono text-cyan-500 bg-cyan-950/30 px-1.5 py-0.5 rounded border border-cyan-900/50">
                     {node.blocks.length} BLOCKS
                   </span>
                 </div>
                 
                 <div className={`
                    rounded-lg p-3 min-h-[120px] border inner-shadow transition-colors
                    ${node.status === 'active' ? 'bg-black/40 border-slate-800' : 'bg-red-950/20 border-red-900/30'}
                 `}>
                    {node.status === 'dead' ? (
                      <div className="flex flex-col items-center justify-center h-full text-red-500/50 gap-2 animate-pulse min-h-[100px]">
                        <AlertTriangle size={32} />
                        <span className="text-xs font-bold tracking-widest">SIGNAL LOST</span>
                      </div>
                    ) : (
                      <div className="grid grid-cols-4 gap-2 content-start">
                        {node.blocks.map((block, idx) => (
                          <div 
                            key={`${block.id}-${idx}`}
                            className={`
                              aspect-square rounded-[2px] ${block.color} 
                              shadow-[0_0_8px_currentColor] opacity-90 
                              hover:scale-110 transition-transform duration-200 cursor-help
                              border border-white/20 relative group/block
                            `}
                            title={`Block ID: ${block.id}`}
                          >
                             <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/block:opacity-100 transition-opacity"></div>
                          </div>
                        ))}
                        {/* Empty slots placeholders for visual effect */}
                        {Array.from({ length: Math.max(0, 8 - node.blocks.length) }).map((_, i) => (
                           <div key={`empty-${i}`} className="aspect-square rounded-[2px] border border-slate-800/60 bg-slate-800/20"></div>
                        ))}
                      </div>
                    )}
                 </div>
              </div>

              {/* Bottom Face / Footer */}
              <div className="px-4 py-3 border-t border-slate-700/50 flex justify-between items-center text-xs bg-slate-950/30 rounded-b-xl">
                <div className="flex items-center gap-2">
                  <div className={`h-1.5 w-1.5 rounded-full ${node.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                  <span className={`${node.status === 'active' ? 'text-slate-400 font-mono' : 'text-red-500'} font-medium`}>
                    {node.status === 'active' ? '10GbE LINK' : 'DISCONNECTED'}
                  </span>
                </div>
                <Activity size={12} className={`${node.status === 'active' ? 'text-cyan-500' : 'text-slate-700'}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};