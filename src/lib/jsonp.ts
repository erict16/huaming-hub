/** Browser-only JSONP helper (GitHub Pages cannot host Next API routes). */
export function jsonp<T = unknown>(url: string, cbQuery = "cb"): Promise<T> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("jsonp is browser-only"));
      return;
    }
    const cbName = `__hm_jsonp_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    const script = document.createElement("script");
    const timer = window.setTimeout(() => {
      cleanup();
      reject(new Error("jsonp timeout"));
    }, 15000);

    const cleanup = () => {
      window.clearTimeout(timer);
      try {
        delete (window as unknown as Record<string, unknown>)[cbName];
      } catch {
        (window as unknown as Record<string, unknown>)[cbName] = undefined;
      }
      script.remove();
    };

    (window as unknown as Record<string, unknown>)[cbName] = (data: T) => {
      cleanup();
      resolve(data);
    };

    const join = url.includes("?") ? "&" : "?";
    script.src = `${url}${join}${cbQuery}=${cbName}`;
    script.onerror = () => {
      cleanup();
      reject(new Error("jsonp network error"));
    };
    document.body.appendChild(script);
  });
}

/** Load a script that assigns globals (e.g. qq finance `v_sz002270="..."`). */
export function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => {
      script.remove();
      resolve();
    };
    script.onerror = () => {
      script.remove();
      reject(new Error("script load failed"));
    };
    document.body.appendChild(script);
  });
}
