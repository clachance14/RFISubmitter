import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "@/components/ui/button";

describe("Button component", () => {
  it("should render with bg-primary class when variant is default", () => {
    render(<Button variant="default">Click</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-primary");
  });

  it("should render with destructive class when variant is destructive", () => {
    render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-destructive");
  });

  it("should render with correct size classes", () => {
    render(<Button size="sm">Small</Button>);
    expect(screen.getByRole("button")).toHaveClass("h-8");
    expect(screen.getByRole("button")).toHaveClass("rounded-md");
    expect(screen.getByRole("button")).toHaveClass("px-3");
  });
});
