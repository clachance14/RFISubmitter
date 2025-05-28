import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreateRfiPage from "../new/page";
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));
test("submits title and redirects", async () => {
  render(<CreateRfiPage />);
  fireEvent.change(screen.getByLabelText(/title/i), {
    target: { value: "Pump RTU clarification" },
  });
  fireEvent.click(screen.getByRole("button", { name: /create/i }));
  await waitFor(() =>
    expect(require("next/navigation").useRouter().push).toHaveBeenCalledWith(
      expect.stringMatching(/^\/rfi\/[0-9a-f-]+$/),
    ),
  );
});
