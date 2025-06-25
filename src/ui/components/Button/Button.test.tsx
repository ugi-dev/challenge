import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

describe('Button Component', () => {
    const defaultProps = {
        children: 'Test Button'
    };

    describe('Rendering', () => {
        it('renders with default props', () => {
            render(<Button {...defaultProps} />);

            const button = screen.getByRole('button', { name: 'Test Button' });
            expect(button).toBeInTheDocument();
            expect(button).toHaveTextContent('Test Button');
        });

        it('renders with custom children', () => {
            render(
                <Button>
                    <span>Custom Content</span>
                </Button>
            );

            const button = screen.getByRole('button');
            expect(button).toHaveTextContent('Custom Content');
        });
    });

    describe('Variants', () => {
        it('applies primary variant by default', () => {
            render(<Button {...defaultProps} />);

            const button = screen.getByRole('button');
            expect(button).toHaveClass('primary');
        });

        it('applies primary variant when explicitly set', () => {
            render(<Button {...defaultProps} variant="primary" />);

            const button = screen.getByRole('button');
            expect(button).toHaveClass('primary');
        });

        it('applies secondary variant when set', () => {
            render(<Button {...defaultProps} variant="secondary" />);

            const button = screen.getByRole('button');
            expect(button).toHaveClass('secondary');
        });
    });

    describe('Loading State', () => {
        it('shows loading spinner when loading is true', () => {
            render(<Button {...defaultProps} loading={true} />);

            const loadingSpinner = screen.getByTestId('loading-spinner');
            expect(loadingSpinner).toBeInTheDocument();
        });

        it('does not show loading spinner when loading is false', () => {
            render(<Button {...defaultProps} loading={false} />);

            const loadingSpinner = screen.queryByTestId('loading-spinner');
            expect(loadingSpinner).not.toBeInTheDocument();
        });

        it('disables button when loading is true', () => {
            render(<Button {...defaultProps} loading={true} />);

            const button = screen.getByRole('button');
            expect(button).toBeDisabled();
        });

        it('enables button when loading is false', () => {
            render(<Button {...defaultProps} loading={false} />);

            const button = screen.getByRole('button');
            expect(button).not.toBeDisabled();
        });
    });

    describe('Click Handler', () => {
        it('calls onClick when button is clicked', () => {
            const handleClick = jest.fn();
            render(<Button {...defaultProps} onClick={handleClick} />);

            const button = screen.getByRole('button');
            fireEvent.click(button);

            expect(handleClick).toHaveBeenCalledTimes(1);
        });

        it('does not call onClick when button is disabled', () => {
            const handleClick = jest.fn();
            render(<Button {...defaultProps} onClick={handleClick} loading={true} />);

            const button = screen.getByRole('button');
            fireEvent.click(button);

            expect(handleClick).not.toHaveBeenCalled();
        });

        it('works without onClick handler', () => {
            render(<Button {...defaultProps} />);

            const button = screen.getByRole('button');
            expect(() => fireEvent.click(button)).not.toThrow();
        });
    });

    describe('Button Type', () => {
        it('uses "button" type by default', () => {
            render(<Button {...defaultProps} />);

            const button = screen.getByRole('button');
            expect(button).toHaveAttribute('type', 'button');
        });

        it('uses custom type when provided', () => {
            render(<Button {...defaultProps} type="submit" />);

            const button = screen.getByRole('button');
            expect(button).toHaveAttribute('type', 'submit');
        });

        it('uses reset type when provided', () => {
            render(<Button {...defaultProps} type="reset" />);

            const button = screen.getByRole('button');
            expect(button).toHaveAttribute('type', 'reset');
        });
    });

    describe('CSS Classes', () => {
        it('applies base button class', () => {
            render(<Button {...defaultProps} />);

            const button = screen.getByRole('button');
            expect(button).toHaveClass('button');
        });

        it('applies both base and variant classes', () => {
            render(<Button {...defaultProps} variant="secondary" />);

            const button = screen.getByRole('button');
            expect(button).toHaveClass('button', 'secondary');
        });
    });

    describe('Accessibility', () => {
        it('has proper button role', () => {
            render(<Button {...defaultProps} />);

            const button = screen.getByRole('button');
            expect(button).toBeInTheDocument();
        });

        it('is accessible by screen readers', () => {
            render(<Button {...defaultProps} />);

            const button = screen.getByRole('button', { name: 'Test Button' });
            expect(button).toBeInTheDocument();
        });
    });

    describe('Edge Cases', () => {
        it('handles empty children', () => {
            render(<Button>{''}</Button>);

            const button = screen.getByRole('button');
            expect(button).toBeInTheDocument();
            expect(button).toHaveTextContent('');
        });

        it('handles null children', () => {
            render(<Button>{null}</Button>);

            const button = screen.getByRole('button');
            expect(button).toBeInTheDocument();
        });

        it('handles undefined children', () => {
            render(<Button>{undefined}</Button>);

            const button = screen.getByRole('button');
            expect(button).toBeInTheDocument();
        });
    });
});