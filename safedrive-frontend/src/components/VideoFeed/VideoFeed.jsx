import React from 'react';
import { Eye } from 'lucide-react';
import Card from '../common/Card';

const VideoFeed = ({ overlayData }) => {
  return (
    <Card className="mb-6">
      <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center border border-slate-700 relative">
        <div className="text-center">
          <Eye className="w-16 h-16 text-teal-400 mx-auto mb-2" />
          <p className="text-slate-400">Camera Feed Placeholder</p>
          <p className="text-xs text-slate-500 mt-2">Connect backend to stream video</p>
        </div>

        {/* Overlays */}
        <div className="absolute top-4 left-4 space-y-2">
          <div className="bg-slate-900/90 backdrop-blur px-3 py-2 rounded-lg border-l-2 border-teal-400">
            <span className="text-sm text-slate-300">👁️ Eyes: {overlayData.eyeStatus}</span>
          </div>
          <div className="bg-slate-900/90 backdrop-blur px-3 py-2 rounded-lg border-l-2 border-teal-400">
            <span className="text-sm text-slate-300">😐 Mouth: {overlayData.mouthStatus}</span>
          </div>
          <div className="bg-slate-900/90 backdrop-blur px-3 py-2 rounded-lg border-l-2 border-teal-400">
            <span className="text-sm text-slate-300">📐 Head: {overlayData.headPose}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VideoFeed;