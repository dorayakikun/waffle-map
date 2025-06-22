import * as React from "react";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { GeodeticInputContainer } from "../components/geodeticInput/";
import { MapContainer } from "../components/map/";
import { MarkerInputContainer } from "../components/markerinput";
import { MeshcodesInputContainer } from "../components/meshcodeinput/index";
import { MeshDetailsContainer } from "../components/meshdetails";
import { MeshToggleContainer } from "../components/meshtoggle/";
import { TileToggleContainer } from "../components/tileToggle";

export function AppContainer() {
  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="grid grid-cols-5 gap-6 p-4 h-full">
        <div className="col-span-1 h-full overflow-hidden">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 h-full flex flex-col">
            <div className="flex-shrink-0 p-6">
              <div className="flex items-center space-x-3">
                <img src="/images/logo.png" alt="wafflemap" className="h-10 w-10" />
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">wafflemap</h1>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto px-6 pb-6">
              <div className="space-y-4">
                <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg p-4">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-3">Coordinate System</h3>
                  <GeodeticInputContainer />
                </div>
                
                <Accordion type="multiple" className="w-full space-y-3">
                <AccordionItem value="tile-grid" className="border border-slate-200 dark:border-slate-600 rounded-lg overflow-hidden">
                  <AccordionTrigger className="px-4 py-4 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                    <div className="flex-1 text-left font-bold text-slate-800 dark:text-slate-100">🌐 Tile Grid</div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-4 bg-slate-50 dark:bg-slate-800">
                    <TileToggleContainer id="tileToggle" />
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="mesh-grid" className="border border-slate-200 dark:border-slate-600 rounded-lg overflow-hidden">
                  <AccordionTrigger className="px-4 py-4 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                    <div className="flex-1 text-left font-bold text-slate-800 dark:text-slate-100">🗂️ Mesh Grid</div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-4 bg-slate-50 dark:bg-slate-800">
                    <MeshToggleContainer id="meshToggle" />
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="marker" className="border border-slate-200 dark:border-slate-600 rounded-lg overflow-hidden">
                  <AccordionTrigger className="px-4 py-4 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                    <div className="flex-1 text-left font-bold text-slate-800 dark:text-slate-100">📍 Marker</div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-4 bg-slate-50 dark:bg-slate-800">
                    <MarkerInputContainer id="markerInput" />
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="mesh-code" className="border border-slate-200 dark:border-slate-600 rounded-lg overflow-hidden">
                  <AccordionTrigger className="px-4 py-4 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                    <div className="flex-1 text-left font-bold text-slate-800 dark:text-slate-100">🔢 Mesh Code</div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-4 bg-slate-50 dark:bg-slate-800 space-y-4">
                    <MeshcodesInputContainer id="meshCodeInput" />
                    <MeshDetailsContainer />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-span-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <MapContainer />
          </div>
        </div>
      </div>
    </div>
  );
}
