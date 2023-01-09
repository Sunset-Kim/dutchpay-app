import { publish, subscribe, unsubscribe } from "../event";

describe("events.ts test", () => {
  it("subscribe", () => {
    const listener = jest.fn();
    subscribe("test", listener);
    publish("test", "test data");
    expect(listener).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "test",
        detail: "test data",
      })
    );
  });

  it("unsubscribe", () => {
    const listener = jest.fn();
    subscribe("test", listener);
    unsubscribe("test", listener);
    publish("test", "test data");
    expect(listener).not.toHaveBeenCalled();
  });

  it("publish", () => {
    const listener = jest.fn();
    subscribe("test", listener);
    publish("test", "test data");
    expect(listener).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "test",
        detail: "test data",
      })
    );
  });
});
