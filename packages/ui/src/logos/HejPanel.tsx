import { cn } from "../utils";

const DEFAULT_HEIGHT = "h-[1em]";

interface HejPanelProps {
	className?: string;
	style?: React.CSSProperties;
}

export const HejPanel = ({ className, style }: HejPanelProps) => {
	return (
		<svg
			className={cn(DEFAULT_HEIGHT, className)}
			style={style}
			viewBox="0 0 128 128"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<rect
				width="128"
				height="128"
				rx="17.2016"
				fill="#001C2E"
			/>
			<g clipPath="url(#clip0_2_126)">
				<path
					d="M92.9245 13.5774H24.2277L26.2632 18.6661V68.5349C35.3134 81.8935 42.1603 87.7335 58.3217 94.487C72.8292 89.4736 79.9232 83.5789 90.3802 68.5349V18.6661L92.9245 13.5774Z"
					fill="white"
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M94.2293 12.1423H22.5391C23.2097 13.7859 24.6475 16.6666 25.3296 18.3294C25.3296 35.8437 25.1893 51.7097 25.3296 69.3492C32.9719 82.2512 44.1538 91.0888 58.4544 95.6206C73.1161 91.151 82.822 82.2945 91.5792 69.3492C91.654 60.7076 91.5039 26.6454 91.5792 18.0038C92.3898 16.2354 93.6874 13.981 94.2293 12.1423ZM91.9599 14.1412H24.9488C25.6988 15.0397 26.5204 17.1238 26.8225 18.3294V68.3845C33.3514 78.9689 45.0946 89.9094 58.3842 93.7168C71.7804 89.5946 82.8051 79.9853 90.0562 68.207C90.1315 59.6402 90.0562 18.0038 90.0562 18.0038C91.9599 14.1412 90.0562 17.9487 91.9599 14.1412Z"
					fill="#0062A3"
				/>
				<path
					d="M31.6911 18.6849C38.8529 18.6849 45.6378 18.6849 52.7996 18.6849C51.7846 19.6726 51.0128 21.0613 50.6887 22.4543C50.6887 42.4319 50.6887 61.6557 50.6887 82.0104C50.6887 83.307 51.9274 85.3153 52.4226 86.1567C52.2739 86.3053 52.5714 86.008 52.4226 86.1567C43.9986 81.8246 36.5913 75.2255 31.6018 67.4636C31.6018 51.1015 31.6911 35.6471 31.6911 18.6849Z"
					fill="#0062A3"
				/>
				<path
					d="M64.1077 18.6849C71.2695 18.6849 77.6774 18.6849 85.2161 18.6849C85.2161 25.9757 85.2161 32.6893 85.2161 39.9801C78.6692 39.9801 72.7772 39.9801 66.2185 39.9801C66.2185 33.8846 66.2185 29.2392 66.2185 23.2082C65.9924 21.7004 65.2385 20.1927 64.1077 18.6849Z"
					fill="#0062A3"
				/>
				<path
					d="M54.972 44.3167C65.2386 44.3167 74.9497 44.3167 85.2163 44.3167C85.2163 53.7401 85.2163 59.3941 85.2163 66.9329C79.9391 75.6024 73.1543 81.6334 64.4847 86.1567C64.9132 85.5233 66.1809 84.0852 66.1809 82.3873C66.1809 72.9639 66.1958 65.0412 66.1958 55.474C62.2231 55.474 58.7809 55.474 55.0613 55.474C55.0612 51.4785 54.972 48.086 54.972 44.3167Z"
					fill="#0062A3"
				/>
			</g>
			<g filter="url(#filter0_d_2_126)">
				<rect
					x="61.2174"
					y="70.83"
					width="47.5573"
					height="47.5573"
					rx="6.57708"
					fill="white"
					fillOpacity="0.8"
					shapeRendering="crispEdges"
				/>
				<path
					d="M73.3091 86.1049L69.9699 82.7657"
					stroke="#001C2E"
					strokeWidth="3.33913"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M79.9873 84.4353V79.4266"
					stroke="#001C2E"
					strokeWidth="3.33913"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M86.6656 86.1049L90.0048 82.7657"
					stroke="#001C2E"
					strokeWidth="3.33913"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M79.9874 101.131C82.7536 101.131 84.9961 98.8885 84.9961 96.1223C84.9961 93.3561 82.7536 91.1136 79.9874 91.1136C77.2211 91.1136 74.9787 93.3561 74.9787 96.1223C74.9787 98.8885 77.2211 101.131 79.9874 101.131Z"
					stroke="#001C2E"
					strokeWidth="3.33913"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M84.7122 94.4527H98.3525C99.2381 94.4527 100.087 94.8045 100.714 95.4307C101.34 96.0569 101.692 96.9062 101.692 97.7918V104.47C101.692 105.356 101.34 106.205 100.714 106.831C100.087 107.457 99.2381 107.809 98.3525 107.809H71.6395C70.7539 107.809 69.9046 107.457 69.2784 106.831C68.6522 106.205 68.3004 105.356 68.3004 104.47V97.7918C68.3004 96.9062 68.6522 96.0569 69.2784 95.4307C69.9046 94.8045 70.7539 94.4527 71.6395 94.4527H75.2624"
					stroke="#001C2E"
					strokeWidth="3.33913"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M91.6743 101.131H95.0134"
					stroke="#001C2E"
					strokeWidth="3.33913"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</g>
			<defs>
				<filter
					id="filter0_d_2_126"
					x="57.17"
					y="67.2885"
					width="55.6522"
					height="56.664"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB">
					<feFlood
						floodOpacity="0"
						result="BackgroundImageFix"
					/>
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feMorphology
						radius="1.01186"
						operator="dilate"
						in="SourceAlpha"
						result="effect1_dropShadow_2_126"
					/>
					<feOffset dy="1.51779" />
					<feGaussianBlur stdDeviation="1.51779" />
					<feComposite
						in2="hardAlpha"
						operator="out"
					/>
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_2_126"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_2_126"
						result="shape"
					/>
				</filter>
				<clipPath id="clip0_2_126">
					<rect
						width="83.4783"
						height="83.4783"
						fill="white"
						transform="translate(16.6956 12.1423)"
					/>
				</clipPath>
			</defs>
		</svg>
	);
};
