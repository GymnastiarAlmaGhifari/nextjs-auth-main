"use client"
import { motion } from 'framer-motion';
import { forwardRef, ReactElement } from 'react';
import { SwapSpinner } from 'react-spinners-kit';
import ReactVirtualizedAutoSizer from 'react-virtualized-auto-sizer';
import { useIsMobile } from '@/services/mobile';

type ChartContainerProps = {
    contentLoaded: boolean;
    edges?: [boolean, boolean, boolean, boolean];
    textLeft?: string;
    textRight?: string;
    textOffset?: string;
    textSize?: string;
    renderChart: (size: {
        width: number;
        height: number;
    }) => React.ReactElement<any>;
};

export const ChartContainer = motion(
    forwardRef(function ChartContainer(
        props: ChartContainerProps,
        ref: React.Ref<HTMLDivElement>
    ) {
        return (
            <div
                ref={ref}
                className={`relative ${props.edges && props.edges.join(' ') === 'true true true true'
                    ? 'rounded-3xl'
                    : 'rounded-lg'
                    } bg-gray-100 dark:bg-gray-800`}
            >
                {props.contentLoaded ? (
                    <>
                        <p
                            className={`absolute top-0 ${props.textOffset ? 'left-0' : 'right-0'
                                } ${props.textOffset ? `ml-${props.textOffset}` : 'ml-13%'
                                } mt-${props.textOffset ?? '13%'} ${props.textSize ? props.textSize : 'text-base'
                                } text-gray-500 dark:text-gray-400 z-2`}
                        >
                            {props.textLeft}
                        </p>
                        <p
                            className={`absolute top-0 ${props.textOffset ? 'right-0' : 'left-0'
                                } ${props.textOffset ? `mr-${props.textOffset}` : 'mr-13%'
                                } mt-${props.textOffset ?? '13%'} ${props.textSize ? props.textSize : 'text-base'
                                } text-gray-500 dark:text-gray-400 z-2`}
                        >
                            {props.textRight}
                        </p>
                        <ReactVirtualizedAutoSizer
                            style={{
                                height: '100%',
                                width: '100%',
                                overflow: 'hidden',
                            }}
                        >
                            {size =>
                                props.renderChart({
                                    width: size.width ?? 0,
                                    height: size.height ?? 0,
                                })
                            }
                        </ReactVirtualizedAutoSizer>
                    </>
                ) : (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <SwapSpinner size={70} color="gray-300 dark:gray-600" loading={true} />
                    </div>
                )}
            </div>
        );
    })
);

ChartContainer.displayName = 'ChartContainer'; // Add this line

type MultiChartContainerProps = {
    columns?: number;
    gap?: number;
    children: ReactElement | ReactElement[];
};
export const MultiChartContainer = motion(
    forwardRef(function MultiChartContainer(
        props: MultiChartContainerProps,
        ref: React.Ref<HTMLDivElement>
    ) {
        const { columns, gap, children } = props;
        const mobile = useIsMobile(); // Use the useMobile hook here

        return (
            <div
                ref={ref}
                className={`relative flex-1 ${mobile ? 'h-270' : 'min-h-0'}`}
            >
                <div
                    className={`grid grid-cols-${columns || 1} grid-flow-row gap-${gap || 20
                        } justify-stretch items-stretch ${mobile ? 'h-full' : 'h-110%'
                        } w-full absolute bottom-0 right-[-10px] z-1`}
                >
                    {children}
                </div>
            </div>
        );
    })
);

MultiChartContainer.displayName = 'MultiChartContainer'; // Add this line
