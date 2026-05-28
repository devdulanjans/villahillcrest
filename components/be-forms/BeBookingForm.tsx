import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function BeBookingForm() {
    const pathname = usePathname();
    const [showUnavailable, setShowUnavailable] = useState(false);

    const loadBookingForm = (w) => {
        // @ts-ignore
        !function(e,n){
            var t="bookingengine",o="integration",i=e[t]=e[t]||{},a=i[o]=i[o]||{},r="__cq",c="__loader",d="getElementsByTagName";
            if(n=n||[],a[r]=a[r]?a[r].concat(n):n,!a[c]){a[c]=!0;var l=e.document,g=l[d]("head")[0]||l[d]("body")[0];
                // @ts-ignore
                !function n(i){if(0!==i.length){var a=l.createElement("script");a.type="text/javascript",a.async=!0,a.src="https://"+i[0]+"/integration/loader.js",
                    a.onerror=a.onload=function(n,i){return function(){e[t]&&e[t][o]&&e[t][o].loaded||(g.removeChild(n),i())}}(a,(function(){n(i.slice(1,i.length))})),g.appendChild(a)}}(
                    ["lk-ibe.hopenapi.com", "ibe.hopenapi.com", "ibe.behopenapi.com"])}
        }(w, [
            ["setContext", "BE-INT-villahillcrest-com_2026-05-27", "en"],
            ["embed", "booking-form", {
                container: "be-booking-form"
            }]
        ]);
    }

  useEffect(() => {
        setShowUnavailable(false);
    loadBookingForm(window);

        const timeoutId = window.setTimeout(() => {
            const container = document.getElementById('be-booking-form');
            const hasWidget = Boolean(container && container.childElementCount > 0);

            if (!hasWidget) {
                setShowUnavailable(true);
            }
        }, 9000);

        return () => {
            window.clearTimeout(timeoutId);
        };
  }, [pathname]);

  return (
            <>
                <div id="be-booking-form" />
                {showUnavailable && (
                    <div style={{ marginTop: 16, padding: 14, border: '1px solid #e6d8b8', background: '#fff8ea', color: '#5b4a1a' }}>
                        <strong>Online booking is temporarily unavailable.</strong>
                        <p style={{ marginTop: 8, marginBottom: 0 }}>
                            Please try again in a few minutes, or contact us directly via
                            {' '}
                            <a href="/contact-us">Contact Us</a>
                            {' '}
                            for immediate assistance.
                        </p>
                    </div>
                )}
            </>
  );
}
