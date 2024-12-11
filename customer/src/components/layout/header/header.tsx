'use client';

import { Box, Flex, HStack, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';
import { MAX_WIDTH } from '@config/index';
import { useTranslation } from '@hook/index';
import { Image, Link, ReactIcon } from '../../ui';
import { AuthButtons } from './auth-buttons';

const Header = () => {
	const { t } = useTranslation();

	return (
		<Box>
			<Box backgroundColor='black'>
				<Flex
					maxWidth={MAX_WIDTH}
					mx='auto'
					py={2}
					justifyContent='space-between'
				>
					<Link href='root'>
						<Image
							src='LogoImage'
							alt='logo'
							width={70}
						/>
					</Link>

					<Flex
						alignItems='center'
						gap={12}
					>
						<AuthButtons />

						<HStack
							as={Link}
							href='cart'
							spacing={3}
							textColor='white'
						>
							<ReactIcon icon='FaShoppingCart' />

							<Text>{t('common:cart')}</Text>
						</HStack>

						<HStack
							as={Link}
							href='tel:1900 6800'
							textColor='white'
							spacing={3}
						>
							<ReactIcon icon='FaPhoneVolume' />

							<Text>1900 6800</Text>
						</HStack>
					</Flex>
				</Flex>
			</Box>

			<Box backgroundColor='bright-green'>
				<Flex
					alignItems='center'
					justifyContent='space-between'
					h='60px'
					maxWidth={MAX_WIDTH}
					mx='auto'
					gap={8}
				>
					<InputGroup
						flex={1}
						maxW='600px'
					>
						<Input
							placeholder={t('common:what_to_find')}
							borderRadius='full'
							backgroundColor='white'
							boxShadow='inner'
						/>

						<InputRightElement>
							<ReactIcon icon='HiMiniMagnifyingGlass' />
						</InputRightElement>
					</InputGroup>

					<Flex
						alignItems='center'
						gap={8}
					>
						<HStack
							as={Link}
							href='cart'
							spacing={3}
							textColor='white'
						>
							<ReactIcon
								icon='HiTicket'
								size={20}
							/>

							<Text>{t('common:endow')}</Text>
						</HStack>

						<HStack
							as={Link}
							href='cart'
							spacing={3}
							textColor='white'
						>
							<ReactIcon
								icon='MdNewspaper'
								size={20}
							/>

							<Text>{t('common:news')}</Text>
						</HStack>
					</Flex>
				</Flex>
			</Box>
		</Box>
	);
};

export { Header };
