import { cn } from "../utils";

const DEFAULT_HEIGHT = "h-[1em]";

interface GytoolProps {
	className?: string;
	style?: React.CSSProperties;
	variant?: "square" | "outline";
	outlineColor?: string;
}

export const Gytool = ({ className, style, variant, outlineColor }: GytoolProps) => {
	return variant === "square" ? (
		<svg
			className={cn(DEFAULT_HEIGHT, className)}
			style={style}
			viewBox="0 0 116 116"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<rect
				width="116"
				height="116"
				rx="20"
				fill="white"
			/>
			<path
				d="M99.3159 11.7191H17.0228L19.4611 17.8149V77.5536C30.3025 93.5561 38.5046 100.552 57.8646 108.642C75.2434 102.636 83.7413 95.575 96.268 77.5536V17.8149L99.3159 11.7191Z"
				fill="white"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M100.879 10H15C15.8033 11.9689 17.5257 15.4197 18.3427 17.4116C18.3427 38.3922 18.1747 57.3984 18.3427 78.5291C27.4975 93.9846 40.8925 104.571 58.0235 110C75.5871 104.646 87.2139 94.0365 97.7042 78.5291C97.7939 68.1772 97.614 27.3735 97.7042 17.0215C98.6753 14.9032 100.23 12.2026 100.879 10ZM98.1603 12.3945H17.8866C18.785 13.4708 19.7692 15.9674 20.1311 17.4116V77.3734C27.9523 90.0527 42.0196 103.158 57.9394 107.719C73.987 102.781 87.1936 91.2703 95.8798 77.1608C95.97 66.8985 95.8798 17.0215 95.8798 17.0215C98.1603 12.3945 95.8798 16.9555 98.1603 12.3945Z"
				fill="#0062A3"
			/>
			<path
				d="M25.9633 17.8375C34.5425 17.8375 42.6703 17.8375 51.2495 17.8375C50.0336 19.0207 49.1092 20.6842 48.7209 22.3529C48.7209 46.2845 48.7209 69.313 48.7209 93.6961C48.7209 95.2494 50.2048 97.6551 50.798 98.663C50.9762 98.485 50.6198 98.8411 50.798 98.663C40.7067 93.4736 31.8333 85.5684 25.8564 76.2702C25.8564 56.6699 25.9633 38.1568 25.9633 17.8375Z"
				fill="#0062A3"
			/>
			<path
				d="M64.7957 17.8375C73.375 17.8375 81.0511 17.8375 90.0819 17.8375C90.0819 26.5712 90.0819 34.6136 90.0819 43.3473C82.2392 43.3473 75.1811 43.3473 67.3243 43.3473C67.3243 36.0455 67.3243 30.4806 67.3243 23.256C67.0534 21.4498 66.1503 19.6437 64.7957 17.8375Z"
				fill="#0062A3"
			/>
			<path
				d="M53.8519 48.5422C66.1504 48.5422 77.7835 48.5422 90.082 48.5422C90.082 59.8307 90.082 66.6037 90.082 75.6345C83.7605 86.0199 75.6327 93.2446 65.2473 98.663C65.7607 97.9043 67.2793 96.1816 67.2793 94.1476C67.2793 82.8592 67.2971 73.3685 67.2971 61.9077C62.5381 61.9077 58.4146 61.9077 53.9588 61.9077C53.9588 57.1214 53.8519 53.0576 53.8519 48.5422Z"
				fill="#0062A3"
			/>
		</svg>
	) : variant === "outline" ? (
		<svg
			className={cn(
				DEFAULT_HEIGHT,
				{
					"invert dark:invert-0": outlineColor === undefined,
				},
				className
			)}
			style={style}
			viewBox="0 0 100 100"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M92.8789 0H7C7.80332 1.96895 9.52571 5.41967 10.3427 7.41163C10.3427 28.3922 10.1747 47.3984 10.3427 68.5291C19.4975 83.9846 32.8925 94.5713 50.0235 100C67.5871 94.6458 79.2139 84.0365 89.7042 68.5291C89.7939 58.1772 89.614 17.3735 89.7042 7.02154C90.6753 4.9032 92.2297 2.2026 92.8789 0ZM90.1603 2.39453H9.88665C10.785 3.47082 11.7692 5.96741 12.1311 7.41163V67.3734C19.9523 80.0527 34.0196 93.1585 49.9394 97.7195C65.987 92.7814 79.1936 81.2703 87.8798 67.1608C87.97 56.8985 87.8798 7.02154 87.8798 7.02154C90.1603 2.39453 87.8798 6.95553 90.1603 2.39453Z"
				fill={outlineColor ?? "white"}
			/>
			<path
				d="M17.9633 7.8375C26.5425 7.8375 34.6703 7.83749 43.2495 7.8375C42.0336 9.02067 41.1092 10.6842 40.7209 12.3529C40.7209 36.2845 40.7209 59.313 40.7209 83.6961C40.7209 85.2494 42.2048 87.6551 42.798 88.663C42.9762 88.485 42.6198 88.8411 42.798 88.663C32.7067 83.4736 23.8333 75.5684 17.8564 66.2702C17.8564 46.6699 17.9633 28.1568 17.9633 7.8375Z"
				fill={outlineColor ?? "white"}
			/>
			<path
				d="M56.7957 7.83751C65.375 7.83749 73.0511 7.8375 82.0819 7.8375C82.0819 16.5712 82.0819 24.6136 82.0819 33.3473C74.2392 33.3473 67.1811 33.3473 59.3243 33.3473C59.3243 26.0455 59.3243 20.4806 59.3243 13.256C59.0534 11.4498 58.1503 9.64366 56.7957 7.83751Z"
				fill={outlineColor ?? "white"}
			/>
			<path
				d="M45.8519 38.5422C58.1504 38.5422 69.7835 38.5422 82.082 38.5422C82.082 49.8307 82.082 56.6037 82.082 65.6345C75.7605 76.0199 67.6327 83.2446 57.2473 88.663C57.7607 87.9043 59.2793 86.1816 59.2793 84.1476C59.2793 72.8592 59.2971 63.3685 59.2971 51.9077C54.5381 51.9077 50.4146 51.9077 45.9588 51.9077C45.9588 47.1214 45.8519 43.0576 45.8519 38.5422Z"
				fill={outlineColor ?? "white"}
			/>
		</svg>
	) : (
		<svg
			className={cn(DEFAULT_HEIGHT, className)}
			style={style}
			viewBox="0 0 100 100"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M91.3159 1.71912H9.02283L11.4611 7.8149V67.5536C22.3025 83.5561 30.5046 90.5519 49.8646 98.642C67.2434 92.6364 75.7413 85.575 88.268 67.5536V7.8149L91.3159 1.71912Z"
				fill="white"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M92.8789 0H7C7.80332 1.96895 9.52571 5.41967 10.3427 7.41163C10.3427 28.3922 10.1747 47.3984 10.3427 68.5291C19.4975 83.9846 32.8925 94.5713 50.0235 100C67.5871 94.6458 79.2139 84.0365 89.7042 68.5291C89.7939 58.1772 89.614 17.3735 89.7042 7.02154C90.6753 4.9032 92.2297 2.2026 92.8789 0ZM90.1603 2.39453H9.88665C10.785 3.47082 11.7692 5.96741 12.1311 7.41163V67.3734C19.9523 80.0527 34.0196 93.1585 49.9394 97.7195C65.987 92.7814 79.1936 81.2703 87.8798 67.1608C87.97 56.8985 87.8798 7.02154 87.8798 7.02154C90.1603 2.39453 87.8798 6.95553 90.1603 2.39453Z"
				fill="#0062A3"
			/>
			<path
				d="M17.9633 7.8375C26.5425 7.8375 34.6703 7.83749 43.2495 7.8375C42.0336 9.02067 41.1092 10.6842 40.7209 12.3529C40.7209 36.2845 40.7209 59.313 40.7209 83.6961C40.7209 85.2494 42.2048 87.6551 42.798 88.663C42.6198 88.8411 42.9762 88.485 42.798 88.663C32.7067 83.4736 23.8333 75.5684 17.8564 66.2702C17.8564 46.6699 17.9633 28.1568 17.9633 7.8375Z"
				fill="#0062A3"
			/>
			<path
				d="M56.7957 7.83751C65.375 7.83749 73.0511 7.8375 82.0819 7.8375C82.0819 16.5712 82.0819 24.6136 82.0819 33.3473C74.2392 33.3473 67.1811 33.3473 59.3243 33.3473C59.3243 26.0455 59.3243 20.4806 59.3243 13.256C59.0534 11.4498 58.1503 9.64366 56.7957 7.83751Z"
				fill="#0062A3"
			/>
			<path
				d="M45.8519 38.5422C58.1504 38.5422 69.7835 38.5422 82.082 38.5422C82.082 49.8307 82.082 56.6037 82.082 65.6345C75.7605 76.0199 67.6327 83.2446 57.2473 88.663C57.7607 87.9043 59.2793 86.1816 59.2793 84.1476C59.2793 72.8592 59.2971 63.3685 59.2971 51.9077C54.5381 51.9077 50.4146 51.9077 45.9588 51.9077C45.9588 47.1214 45.8519 43.0576 45.8519 38.5422Z"
				fill="#0062A3"
			/>
		</svg>
	);
};
