"use client";

export default function Tree({ size = 320 }: { size?: number }) {
  return (
    <div className="tree-breathe" style={{ width: size, height: size, margin: "0 auto" }}>
      <svg
        viewBox="0 0 320 340"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%" }}
        aria-label="A living tree"
      >
        <defs>
          <radialGradient id="groundGrad" cx="50%" cy="100%" r="60%">
            <stop offset="0%" stopColor="#8B7355" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#8B7355" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="canopyGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#5A6B3A" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#2D3A1E" stopOpacity="0.7" />
          </radialGradient>
          <filter id="soft">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ground shadow */}
        <ellipse cx="160" cy="320" rx="80" ry="14" fill="url(#groundGrad)" />

        {/* Roots */}
        <path d="M155 295 Q140 310 118 318" stroke="#5C3D1E" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7" />
        <path d="M160 298 Q158 315 155 325" stroke="#5C3D1E" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
        <path d="M165 295 Q182 308 204 315" stroke="#5C3D1E" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7" />
        <path d="M152 300 Q132 318 112 322" stroke="#7A5C35" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" />
        <path d="M168 300 Q192 320 212 320" stroke="#7A5C35" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" />

        {/* Trunk */}
        <path
          d="M148 295 Q145 260 150 230 Q153 210 155 185 Q156 170 160 155"
          stroke="#5C3D1E" strokeWidth="14" fill="none" strokeLinecap="round"
        />
        <path
          d="M172 295 Q175 260 170 230 Q167 210 165 185 Q164 170 160 155"
          stroke="#7A5C35" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.7"
        />
        {/* Trunk texture */}
        <path d="M155 270 Q157 265 155 260" stroke="#8B7355" strokeWidth="1" fill="none" opacity="0.4" />
        <path d="M165 250 Q163 244 165 238" stroke="#8B7355" strokeWidth="1" fill="none" opacity="0.4" />

        {/* Major branches */}
        <path d="M157 200 Q130 185 105 170" stroke="#5C3D1E" strokeWidth="7" fill="none" strokeLinecap="round" />
        <path d="M159 180 Q175 160 195 148" stroke="#5C3D1E" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M160 165 Q148 145 138 125" stroke="#5C3D1E" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M161 170 Q178 152 188 132" stroke="#5C3D1E" strokeWidth="4.5" fill="none" strokeLinecap="round" />

        {/* Minor branches */}
        <path d="M105 170 Q88 158 72 162" stroke="#6B4A22" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M105 170 Q95 152 92 138" stroke="#6B4A22" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M195 148 Q212 138 224 140" stroke="#6B4A22" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M195 148 Q205 132 208 118" stroke="#6B4A22" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M138 125 Q125 108 118 95" stroke="#6B4A22" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M188 132 Q196 115 198 100" stroke="#6B4A22" strokeWidth="2.5" fill="none" strokeLinecap="round" />

        {/* Canopy clusters — back layer */}
        <ellipse cx="100" cy="152" rx="42" ry="36" fill="#2D3A1E" opacity="0.55" filter="url(#soft)" />
        <ellipse cx="205" cy="130" rx="40" ry="34" fill="#2D3A1E" opacity="0.55" filter="url(#soft)" />
        <ellipse cx="155" cy="115" rx="38" ry="32" fill="#2D3A1E" opacity="0.5" filter="url(#soft)" />

        {/* Canopy clusters — mid layer */}
        <ellipse cx="95" cy="145" rx="36" ry="30" fill="#3D4A2E" opacity="0.7" />
        <ellipse cx="208" cy="122" rx="34" ry="28" fill="#3D4A2E" opacity="0.7" />
        <ellipse cx="150" cy="108" rx="32" ry="28" fill="#3D4A2E" opacity="0.65" />
        <ellipse cx="135" cy="130" rx="28" ry="24" fill="#4A5835" opacity="0.6" />
        <ellipse cx="175" cy="118" rx="26" ry="22" fill="#4A5835" opacity="0.6" />

        {/* Canopy clusters — front (lighter) */}
        <ellipse cx="88" cy="138" rx="30" ry="24" fill="#5A6B3A" opacity="0.75" />
        <ellipse cx="218" cy="115" rx="28" ry="22" fill="#5A6B3A" opacity="0.75" />
        <ellipse cx="158" cy="100" rx="26" ry="22" fill="#5A6B3A" opacity="0.7" />
        <ellipse cx="120" cy="125" rx="22" ry="18" fill="#6B7D45" opacity="0.65" />
        <ellipse cx="192" cy="108" rx="20" ry="16" fill="#6B7D45" opacity="0.65" />

        {/* Light-catching leaf highlights */}
        <ellipse cx="82" cy="130" rx="14" ry="10" fill="#7A8C6A" opacity="0.45" />
        <ellipse cx="222" cy="108" rx="12" ry="9" fill="#7A8C6A" opacity="0.45" />
        <ellipse cx="160" cy="88" rx="13" ry="9" fill="#7A8C6A" opacity="0.4" />
        <ellipse cx="128" cy="116" rx="10" ry="7" fill="#8A9E75" opacity="0.35" />

        {/* Individual leaves — scattered */}
        <ellipse cx="70" cy="155" rx="6" ry="4" fill="#5A6B3A" opacity="0.6" transform="rotate(-20 70 155)" />
        <ellipse cx="230" cy="125" rx="5" ry="3.5" fill="#5A6B3A" opacity="0.6" transform="rotate(15 230 125)" />
        <ellipse cx="145" cy="82" rx="5" ry="3.5" fill="#6B7D45" opacity="0.55" transform="rotate(-10 145 82)" />
        <ellipse cx="108" cy="92" rx="4.5" ry="3" fill="#5A6B3A" opacity="0.5" transform="rotate(25 108 92)" />
        <ellipse cx="205" cy="92" rx="4.5" ry="3" fill="#5A6B3A" opacity="0.5" transform="rotate(-15 205 92)" />
        <ellipse cx="75" cy="125" rx="4" ry="3" fill="#7A8C6A" opacity="0.5" transform="rotate(30 75 125)" />

        {/* Trunk bark detail lines */}
        <path d="M154 280 Q156 275 154 270" stroke="#8B7355" strokeWidth="0.8" fill="none" opacity="0.5" />
        <path d="M162 255 Q164 250 162 245" stroke="#8B7355" strokeWidth="0.8" fill="none" opacity="0.5" />
        <path d="M156 235 Q158 230 156 225" stroke="#8B7355" strokeWidth="0.8" fill="none" opacity="0.5" />
      </svg>
    </div>
  );
}
