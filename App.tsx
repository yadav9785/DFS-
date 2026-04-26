import React, { useState, useEffect, useCallback, useRef } from 'react';
import { DFSVisualizer } from './components/PlanDisplay';
import { DataNode, FileMetadata, Block, SystemLog } from './types';
import { generateId, getRandomColor, formatTime } from './services/geminiService';
import { Network, Upload, RefreshCw, LayoutTemplate, Loader2, Lock, ArrowRight, User, Shield, Server, Box, Hexagon, Zap, ShieldCheck, Database, Cpu } from 'lucide-react';

// Configuration
const REPLICATION_FACTOR = 3;
const REPLICATION_CHECK_INTERVAL = 4000; // ms
const UPLOAD_SPEED_MS = 100; // Speed of simulation ticks

// Initial Data
const INITIAL_NODES: DataNode[] = [
  { id: 'dn-01', name: 'Node-1', status: 'active', blocks: [], lastHeartbeat: Date.now() },
  { id: 'dn-02', name: 'Node-2', status: 'active', blocks: [], lastHeartbeat: Date.now() },
  { id: 'dn-03', name: 'Node-3', status: 'active', blocks: [], lastHeartbeat: Date.now() },
  { id: 'dn-04', name: 'Node-4', status: 'active', blocks: [], lastHeartbeat: Date.now() },
  { id: 'dn-05', name: 'Node-5', status: 'active', blocks: [], lastHeartbeat: Date.now() },
  { id: 'dn-06', name: 'Node-6', status: 'active', blocks: [], lastHeartbeat: Date.now() },
];

const LoginPage: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-cyan-500/30">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
         <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '2s'}}></div>
         
         {/* Cyber Grid Effect */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
         <div className="absolute inset-0" style={{ 
            backgroundImage: 'linear-gradient(rgba(56, 189, 248, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.03) 1px, transparent 1px)', 
            backgroundSize: '40px 40px',
            transform: 'perspective(500px) rotateX(60deg) translateY(-100px) scale(2)',
            transformOrigin: 'top center'
         }}></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl grid md:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Premium 3D Visualization */}
        <div className="hidden md:flex flex-col items-center justify-center perspective-1000">
           <div className="relative w-[480px] h-[520px] preserve-3d animate-[float_8s_ease-in-out_infinite] group">
              
              {/* Glowing Orb Behind */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-cyan-500 rounded-full blur-[120px] opacity-30 group-hover:opacity-50 transition-opacity duration-700"></div>

              {/* Main Image Card with 3D Tilt */}
              <div className="absolute inset-0 rounded-[2rem] overflow-hidden border border-slate-700/50 shadow-[0_20px_100px_rgba(0,0,0,0.8)] transform transition-transform duration-700 group-hover:rotate-y-6 group-hover:rotate-x-6 bg-slate-900 z-10">
                
                {/* Image Layer */}
                <div className="absolute inset-0">
                  <img 
                    src="https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=1000&auto=format&fit=crop" 
                    alt="Data Center Abstract" 
                    className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-1000 scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent"></div>
                  <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay"></div>
                </div>

                {/* Content Inside Card (Parallax) */}
                <div className="absolute bottom-0 left-0 p-10 z-20 transform translate-z-10 group-hover:translate-z-20 transition-transform duration-500">
                   <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-3 w-3 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                      </div>
                      <span className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase font-bold text-shadow-glow">
                        Mainframe Online
                      </span>
                   </div>
                   <h2 className="text-6xl font-black text-white font-tech tracking-tighter leading-[0.9] drop-shadow-lg">
                     DFS<br/>
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">CORE</span>
                   </h2>
                   <div className="mt-6 flex gap-4 text-xs font-mono text-slate-400">
                      <div className="border-l border-slate-600 pl-3">
                        <div className="text-white font-bold">99.99%</div>
                        <div>UPTIME</div>
                      </div>
                      <div className="border-l border-slate-600 pl-3">
                        <div className="text-white font-bold">ZERO</div>
                        <div>LATENCY</div>
                      </div>
                   </div>
                </div>
              </div>
              
              {/* Floating 3D Elements (Parallax Layers) */}
              
              {/* Top Right: Security Badge */}
              <div className="absolute -right-6 top-16 z-30 animate-[float_4s_ease-in-out_infinite] animation-delay-1000 transform group-hover:translate-z-30 group-hover:-translate-y-2 transition-transform duration-500">
                 <div className="backdrop-blur-xl bg-slate-900/80 border border-slate-600/50 p-4 rounded-2xl shadow-2xl flex items-center gap-4 min-w-[180px]">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2.5 rounded-xl shadow-lg shadow-indigo-500/30">
                       <ShieldCheck size={20} className="text-white" />
                    </div>
                    <div>
                       <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Protocol</div>
                       <div className="text-white font-tech text-lg leading-none">SECURE</div>
                    </div>
                 </div>
              </div>

              {/* Bottom Right: Replica Count */}
              <div className="absolute -right-12 bottom-32 z-40 animate-[float_5s_ease-in-out_infinite] animation-delay-2000 transform group-hover:translate-z-40 transition-transform duration-500">
                 <div className="backdrop-blur-xl bg-slate-900/90 border border-slate-600/50 p-4 rounded-2xl shadow-2xl flex items-center gap-4 min-w-[200px]">
                    <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2.5 rounded-xl shadow-lg shadow-emerald-500/30">
                       <Database size={20} className="text-white" />
                    </div>
                    <div>
                       <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Replication</div>
                       <div className="text-white font-tech text-lg leading-none">3X REDUNDANCY</div>
                    </div>
                 </div>
              </div>

              {/* Left Side: Performance Chip */}
              <div className="absolute -left-8 top-1/2 z-50 animate-[float_6s_ease-in-out_infinite] transform group-hover:translate-z-50 transition-transform duration-500">
                 <div className="backdrop-blur-md bg-white/5 border border-white/10 p-3 rounded-xl shadow-xl">
                    <Hexagon size={28} className="text-cyan-400 animate-spin-slow drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                 </div>
              </div>

           </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full max-w-md mx-auto">
           <div className="bg-slate-900/60 backdrop-blur-2xl border border-slate-700/50 p-8 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
              {/* Animated Border Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none"></div>
              
              <div className="mb-10 relative">
                 <div className="w-16 h-16 bg-gradient-to-br from-cyan-600 to-blue-700 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg shadow-cyan-500/20 transform rotate-6 group-hover:rotate-0 transition-transform duration-300">
                   <Server size={32} />
                 </div>
                 <h1 className="text-4xl font-black text-white mb-2 font-tech tracking-wide">ACCESS PORTAL</h1>
                 <p className="text-slate-400 text-sm font-medium">Identify yourself to enter the Master Node.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                 <div className="space-y-2">
                   <label className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest ml-1">Operator ID</label>
                   <div className="relative group/input">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="text-slate-500 group-focus-within/input:text-cyan-400 transition-colors" size={18} />
                      </div>
                      <input 
                        type="text" 
                        defaultValue="admin"
                        className="block w-full pl-11 pr-4 py-4 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all font-mono text-sm hover:border-slate-700"
                        placeholder="Enter username"
                      />
                   </div>
                 </div>
                 
                 <div className="space-y-2">
                   <label className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest ml-1">Security Key</label>
                   <div className="relative group/input">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="text-slate-500 group-focus-within/input:text-cyan-400 transition-colors" size={18} />
                      </div>
                      <input 
                        type="password" 
                        defaultValue="password"
                        className="block w-full pl-11 pr-4 py-4 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all font-mono text-sm hover:border-slate-700"
                        placeholder="••••••••"
                      />
                   </div>
                 </div>

                 <button 
                   type="submit" 
                   disabled={loading}
                   className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl mt-4 transition-all transform hover:-translate-y-1 shadow-lg shadow-cyan-600/30 flex items-center justify-center gap-2 group/btn relative overflow-hidden"
                 >
                   <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                   <div className="relative flex items-center gap-2">
                     {loading ? (
                       <Loader2 className="animate-spin" size={20} />
                     ) : (
                       <>
                         INITIATE SEQUENCE
                         <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                       </>
                     )}
                   </div>
                 </button>
              </form>
              
              <div className="mt-8 pt-6 border-t border-slate-800/50 flex items-center justify-between text-[10px] text-slate-500 font-mono uppercase tracking-widest">
                 <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                   <span>System Operational</span>
                 </div>
                 <span>v2.4.0-RC</span>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nodes, setNodes] = useState<DataNode[]>(INITIAL_NODES);
  const [files, setFiles] = useState<FileMetadata[]>([]);
  const [logs, setLogs] = useState<SystemLog[]>([]);
  
  // Upload State
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [currentUploadFile, setCurrentUploadFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Logging Helper
  const addLog = useCallback((message: string, type: SystemLog['type'] = 'info') => {
    setLogs(prev => [...prev.slice(-19), {
      id: generateId(),
      timestamp: formatTime(new Date()),
      message,
      type
    }]);
  }, []);

  // 1. UPLOAD LOGIC
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileName = file.name;
    const fileSize = (file.size / 1024 / 1024).toFixed(2); // MB
    
    // Check for active nodes availability
    const activeNodes = nodes.filter(n => n.status === 'active');
    if (activeNodes.length < REPLICATION_FACTOR) {
      addLog(`Upload failed: Not enough active nodes (Need ${REPLICATION_FACTOR})`, 'error');
      if (fileInputRef.current) fileInputRef.current.value = ''; // Reset input
      return;
    }

    // Start Upload Simulation
    startUploadSimulation(fileName, fileSize, activeNodes);
  };

  const startUploadSimulation = (fileName: string, fileSize: string, activeNodes: DataNode[]) => {
    setUploadProgress(0);
    setCurrentUploadFile(fileName);
    addLog(`Client initiated upload stream: "${fileName}" (${fileSize} MB)...`, 'info');

    let progress = 0;
    const interval = setInterval(() => {
      progress += 4; 
      setUploadProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        finalizeUpload(fileName, activeNodes);
      }
    }, UPLOAD_SPEED_MS);
  };

  const finalizeUpload = (fileName: string, activeNodes: DataNode[]) => {
    setUploadProgress(null);
    setCurrentUploadFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';

    const newFile: FileMetadata = {
      id: generateId(),
      name: fileName,
      blocks: [],
      replicationFactor: REPLICATION_FACTOR,
      uploadStatus: 'complete'
    };

    const fileColor = getRandomColor();
    const newBlocks: Block[] = Array.from({ length: 4 }).map((_, i) => ({
      id: `${newFile.id}-blk${i}`,
      parentId: newFile.id,
      index: i,
      color: fileColor
    }));

    newFile.blocks = newBlocks;
    setFiles(prev => [...prev, newFile]);
    addLog(`Stream complete. Splitting "${fileName}" into ${newBlocks.length} blocks.`, 'success');

    distributeBlocks(newBlocks, activeNodes);
  };

  const distributeBlocks = (blocks: Block[], availableNodes: DataNode[]) => {
    setNodes(prevNodes => {
      const updatedNodes = [...prevNodes];
      
      blocks.forEach(block => {
        const shuffled = [...updatedNodes.filter(n => n.status === 'active')].sort(() => 0.5 - Math.random());
        const selectedNodes = shuffled.slice(0, REPLICATION_FACTOR);
        
        selectedNodes.forEach(node => {
          const targetNode = updatedNodes.find(n => n.id === node.id);
          if (targetNode) {
            targetNode.blocks = [...targetNode.blocks, block];
          }
        });
      });
      return updatedNodes;
    });
    addLog(`NameNode: Distributed ${blocks.length * REPLICATION_FACTOR} replicas across cluster.`, 'info');
  };

  // 2. TOGGLE NODE STATUS
  const toggleNode = (id: string) => {
    setNodes(prev => prev.map(node => {
      if (node.id === id) {
        const newStatus = node.status === 'active' ? 'dead' : 'active';
        addLog(`Heartbeat Monitor: Node ${node.name} status changed to ${newStatus.toUpperCase()}`, newStatus === 'dead' ? 'error' : 'success');
        return { ...node, status: newStatus };
      }
      return node;
    }));
  };

  // 3. ADD NEW NODE
  const addNode = () => {
    const id = nodes.length + 1;
    const newNode: DataNode = {
      id: `dn-0${id}`,
      name: `Node-${id}`,
      status: 'active',
      blocks: [],
      lastHeartbeat: Date.now()
    };
    setNodes(prev => [...prev, newNode]);
    addLog(`Cluster Manager: Registered new DataNode ${newNode.name}`, 'success');
  };

  const deleteFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
    setNodes(prev => prev.map(node => ({
      ...node,
      blocks: node.blocks.filter(b => b.parentId !== id)
    })));
    addLog(`NameNode: Removed file metadata and reclaimed blocks.`, 'warning');
  };

  // 4. HEARTBEAT & REPLICATION MONITOR
  useEffect(() => {
    if (!isLoggedIn) return;

    const interval = setInterval(() => {
      const activeNodes = nodes.filter(n => n.status === 'active');
      
      let operations: { block: Block; targetId: string; sourceId: string; fileName: string }[] = [];

      files.forEach(file => {
        file.blocks.forEach(block => {
          const activeHolders = activeNodes.filter(n => n.blocks.some(b => b.id === block.id));
          const currentReplicaCount = activeHolders.length;

          if (currentReplicaCount > 0 && currentReplicaCount < file.replicationFactor) {
             const candidates = activeNodes.filter(n => !n.blocks.some(b => b.id === block.id));
             
             if (candidates.length > 0) {
               const target = candidates[Math.floor(Math.random() * candidates.length)];
               const source = activeHolders[0]; 
               
               if (!operations.some(op => op.block.id === block.id)) {
                 operations.push({
                   block,
                   targetId: target.id,
                   sourceId: source.id,
                   fileName: file.name
                 });
               }
             }
          }
        });
      });

      if (operations.length > 0) {
        if (operations.length > 3) {
           addLog(`Auto-Healer: Batch recovery initiated for ${operations.length} blocks.`, 'warning');
        } else {
           operations.forEach(op => {
             const targetName = nodes.find(n => n.id === op.targetId)?.name || op.targetId;
             addLog(`Auto-Healer: Replicating ${op.fileName} (Block ${op.block.index}) -> ${targetName}`, 'warning');
           });
        }

        setNodes(prevNodes => prevNodes.map(node => {
          const opsForNode = operations.filter(op => op.targetId === node.id);
          if (opsForNode.length > 0) {
            return {
              ...node,
              blocks: [...node.blocks, ...opsForNode.map(op => op.block)]
            };
          }
          return node;
        }));
      }

    }, REPLICATION_CHECK_INTERVAL);

    return () => clearInterval(interval);
  }, [nodes, files, addLog, isLoggedIn]);

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30">
      {/* Top Navigation Bar */}
      <nav className="bg-slate-900/50 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-cyan-600 to-blue-600 p-2 rounded-lg shadow-[0_0_15px_rgba(8,145,178,0.3)]">
              <Network size={20} className="text-white" />
            </div>
            <div>
              <h1 className="font-tech font-bold text-xl tracking-wide text-white">DFS <span className="text-cyan-500">NEXUS</span></h1>
              <div className="flex items-center gap-2">
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">Cluster Online</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
             <div className="hidden md:flex items-center gap-2 px-4 py-1.5 bg-slate-800/50 rounded-full border border-slate-700/50">
               <RefreshCw size={14} className="text-emerald-400 animate-[spin_3s_linear_infinite]" />
               <span className="text-xs font-medium text-slate-300">Auto-Replication Active</span>
             </div>
             <div className="flex items-center gap-3 pl-6 border-l border-slate-800">
               <div className="text-right hidden sm:block">
                  <div className="text-xs font-bold text-slate-200">Admin User</div>
                  <div className="text-[10px] text-slate-500">Root Access</div>
               </div>
               <div className="h-8 w-8 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700">
                  <User size={16} className="text-slate-400" />
               </div>
             </div>
          </div>
        </div>
      </nav>

      {/* Main Control Panel */}
      <div className="bg-slate-900 border-b border-slate-800 py-8 px-6 shadow-2xl relative overflow-hidden">
        {/* Background Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(30,41,59,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.5)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
            {/* Upload Controls */}
            <div className="flex flex-col w-full md:w-auto gap-4">
              <div className="flex items-center gap-4">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileSelect} 
                  className="hidden" 
                  disabled={uploadProgress !== null}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadProgress !== null}
                  className="group relative overflow-hidden flex items-center gap-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-cyan-500/25 active:scale-[0.98]"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                  {uploadProgress !== null ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <Box size={20} className="group-hover:animate-bounce" />
                  )}
                  {uploadProgress !== null ? 'Transmitting...' : 'Upload Data Object'}
                </button>
                <div className="hidden md:block text-slate-500 text-sm max-w-xs leading-tight">
                  Select a local file to simulate packet stream, chunking, and block distribution.
                </div>
              </div>

              {/* Progress Bar Area */}
              {uploadProgress !== null && (
                <div className="w-full max-w-md animate-in fade-in slide-in-from-left-4 duration-500">
                  <div className="flex justify-between text-xs mb-2 font-medium text-cyan-300">
                    <span className="flex items-center gap-2"><Upload size={12} /> Uploading {currentUploadFile}...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
                    <div 
                      className="bg-gradient-to-r from-cyan-500 to-blue-400 h-2 rounded-full transition-all duration-150 ease-out shadow-[0_0_10px_rgba(6,182,212,0.5)]" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="flex gap-8">
              <div className="flex flex-col items-center p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-sm min-w-[100px]">
                 <span className="text-slate-500 text-xs uppercase font-bold tracking-wider mb-1">Nodes</span>
                 <span className="font-tech font-bold text-3xl text-white">{nodes.length}</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-sm min-w-[100px]">
                 <span className="text-slate-500 text-xs uppercase font-bold tracking-wider mb-1">Healthy</span>
                 <span className="font-tech font-bold text-3xl text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">
                   {nodes.filter(n => n.status === 'active').length}
                 </span>
              </div>
              <div className="flex flex-col items-center p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-sm min-w-[100px]">
                 <span className="text-slate-500 text-xs uppercase font-bold tracking-wider mb-1">Files</span>
                 <span className="font-tech font-bold text-3xl text-cyan-400">
                   {files.length}
                 </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-[1400px] mx-auto px-6 py-10">
        <DFSVisualizer 
          nodes={nodes} 
          files={files} 
          logs={logs}
          onToggleNode={toggleNode}
          onAddNode={addNode}
          onDeleteFile={deleteFile}
        />
      </main>
    </div>
  );
};

export default App;