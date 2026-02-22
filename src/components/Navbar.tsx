import { Group, Button, Text, Burger, Drawer, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

const links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
]

export function Navbar() {
  const [opened, { toggle, close }] = useDisclosure(false)

  return (
    <>
      <Group
        h={60}
        px="xl"
        justify="space-between"
        bg="black"
        style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}
      >
        {/* Logo */}
        <Text fw={700} size="lg">MyApp</Text>

        {/* Desktop links */}
        <Group gap="sm" visibleFrom="sm">
          {links.map((link) => (
            <Button key={link.label} variant="subtle" color="gray" component="a" href={link.href}>
              {link.label}
            </Button>
          ))}
        </Group>

        {/* CTA */}
        <Button visibleFrom="sm">Get Started</Button>

        {/* Mobile burger */}
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" />
      </Group>

      {/* Mobile drawer */}
      <Drawer opened={opened} onClose={close} title="Menu" hiddenFrom="sm">
        <Stack>
          {links.map((link) => (
            <Button
              key={link.label}
              variant="subtle"
              color="gray"
              fullWidth
              component="a"
              href={link.href}
              onClick={close}
            >
              {link.label}
            </Button>
          ))}
          <Button fullWidth>Get Started</Button>
        </Stack>
      </Drawer>
    </>
  )
}