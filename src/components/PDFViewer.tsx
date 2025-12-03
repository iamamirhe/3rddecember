import { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  pdfUrl?: string;
  visible: boolean;
}

const PDFViewer = ({ pdfUrl = '/assets/letter.pdf', visible }: PDFViewerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!visible) return;

    const loadPDF = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        setPdfDoc(pdf);
        setNumPages(pdf.numPages);
        setLoading(false);
      } catch (err) {
        console.warn('PDF not found, showing placeholder');
        setError(true);
        setLoading(false);
      }
    };

    loadPDF();
  }, [pdfUrl, visible]);

  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;

    const renderPage = async (pageNum: number) => {
      const page = await pdfDoc.getPage(pageNum);
      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext('2d');
      if (!context) return;

      const viewport = page.getViewport({ scale: 1.5 });

      const scale = Math.min(
        (window.innerWidth * 0.9) / viewport.width,
        (window.innerHeight * 0.85) / viewport.height
      );

      const scaledViewport = page.getViewport({ scale });

      canvas.height = scaledViewport.height;
      canvas.width = scaledViewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: scaledViewport,
      };

      await page.render(renderContext).promise;
    };

    renderPage(currentPage);
  }, [pdfDoc, currentPage]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-4 animate-fade-in"
    >
      {loading && (
        <div className="text-white text-2xl font-light tracking-wide animate-pulse">
          Loading...
        </div>
      )}

      {error && (
        <div className="text-center space-y-6 text-white max-w-2xl">
          <div className="text-6xl mb-8">💌</div>
          <h2 className="text-4xl font-serif mb-4">A Letter for You</h2>
          <p className="text-xl font-light leading-relaxed opacity-90">
            This is where your special letter will appear.
          </p>
          <p className="text-sm opacity-60 mt-8">
            Place your PDF file at: <code className="bg-white/10 px-2 py-1 rounded">/public/assets/letter.pdf</code>
          </p>
        </div>
      )}

      {!loading && !error && (
        <>
          <canvas
            ref={canvasRef}
            className="max-w-full max-h-[85vh] shadow-2xl"
          />

          {numPages > 1 && (
            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-6 py-2 bg-white/10 text-white border border-white/30 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                Previous
              </button>

              <span className="text-white font-light">
                Page {currentPage} of {numPages}
              </span>

              <button
                onClick={() => setCurrentPage(p => Math.min(numPages, p + 1))}
                disabled={currentPage === numPages}
                className="px-6 py-2 bg-white/10 text-white border border-white/30 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export { PDFViewer };
export type { PDFViewerProps };
