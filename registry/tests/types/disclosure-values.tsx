import { Accordion } from "@/components/ui/accordion";
import { NavigationMenu } from "@/components/ui/navigation-menu";

export function DisclosureValueTypes() {
  return (
    <>
      <Accordion
        value={[1]}
        className={(state) => state.value[0]?.toFixed()}
        onValueChange={(values) => {
          values[0]?.toFixed();
          // @ts-expect-error Numeric item values do not have string methods.
          values[0]?.toUpperCase();
        }}
      />
      <Accordion defaultValue={[1]} onValueChange={(values) => values[0]?.toFixed()} />
      <Accordion<number> defaultValue={[1]} />
      <NavigationMenu
        value={1}
        onValueChange={(value) => {
          value?.toFixed();
          // @ts-expect-error Numeric item values do not have string methods.
          value?.toUpperCase();
        }}
      />
      <NavigationMenu defaultValue={1} onValueChange={(value) => value?.toFixed()} />
      <NavigationMenu<number> defaultValue={1} />
    </>
  );
}
