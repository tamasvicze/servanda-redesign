"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { GB, NO } from "country-flag-icons/react/3x2";
import { useTransition } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";
import { languages, type Locale } from "@/i18n/config";
import { setUserLocale, deleteUserLocale } from "@/server/actions/locale";

export default function NavigationMenuDemo() {
	const [open, setOpen] = React.useState(false);
	const pathname = usePathname();
	const locale = useLocale();
	const t = useTranslations("Navigation");
	const [isPending, startTransition] = useTransition();

	const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
		e.preventDefault();
		
		// Close the sheet/menu
		setOpen(false);
		
		// Use setTimeout to delay the scrolling until after the sheet is closed
		setTimeout(() => {
			const section = document.getElementById(sectionId);
			if (section) {
				// Use window.scrollTo with no offset since header is no longer fixed
				const y = section.getBoundingClientRect().top + window.pageYOffset;
				
				window.scrollTo({
					top: y,
					behavior: 'smooth'
				});
			}
		}, 300); // Longer delay to ensure sheet is fully closed
	};

	const isActive = (href: string) => pathname === href;

	const changeLanguage = (newLocale: Locale | "system") => {
		startTransition(() => {
			if (newLocale === "system") {
				deleteUserLocale();
			} else {
				setUserLocale(newLocale);
			}
			// Reload the page to get new translations
			// window.location.reload();
		});
	};

	return (
		<>
			{/* Desktop Navigation */}
			<div id="main-nav" className="hidden md:flex w-full items-center justify-between h-[17vh] px-8">
				<div className="max-w-5xl mx-auto w-full flex items-center justify-between">
					<div className="w-12 h-12">
						<Image
							src="/images/favicon.svg"
							alt="Servanda"
							width={48}
							height={48}
							className="w-full h-full"
							draggable="false"
						/>
					</div>
					<ul className="flex gap-8 items-center">
						<li>
							<a 
								href="#product" 
								onClick={(e) => handleLinkClick(e, "product")}
								className="text-xl text-black hover:text-gray-600 hover:underline hover:decoration-gray-300 hover:underline-offset-4 transition-all duration-300"
								draggable="false"
							>
								{t("product")}
							</a>
						</li>
						<li>
							<a 
								href="#security" 
								onClick={(e) => handleLinkClick(e, "security")}
								className="text-xl text-black hover:text-gray-600 hover:underline hover:decoration-gray-300 hover:underline-offset-4 transition-all duration-300"
								draggable="false"
							>
								{t("security")}
							</a>
						</li>
						<li>
							<a 
								href="#team" 
								onClick={(e) => handleLinkClick(e, "team")}
								className="text-xl text-black hover:text-gray-600 hover:underline hover:decoration-gray-300 hover:underline-offset-4 transition-all duration-300"
								draggable="false"
							>
								{t("team")}
							</a>
						</li>
						<li>
							<a 
								href="#news" 
								onClick={(e) => handleLinkClick(e, "news")}
								className="text-xl text-black hover:text-gray-600 hover:underline hover:decoration-gray-300 hover:underline-offset-4 transition-all duration-300"
								draggable="false"
							>
								{t("news")}
							</a>
						</li>
						<li>
							<a 
								href="#contact" 
								onClick={(e) => handleLinkClick(e, "contact")}
								className="text-xl text-black hover:text-gray-600 hover:underline hover:decoration-gray-300 hover:underline-offset-4 transition-all duration-300"
								draggable="false"
							>
								{t("contact")}
							</a>
						</li>
						<li>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" size="icon" disabled={isPending} className="ml-2">
										{locale === "en" ? (
											<GB className="w-5 h-5" />
										) : (
											<NO className="w-5 h-5" />
										)}
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									{Object.entries(languages).map(([langKey, langName]) => (
										<DropdownMenuItem
											key={langKey}
											onClick={() => changeLanguage(langKey as Locale)}
										>
											{langKey === "en" ? (
												<GB className="w-4 h-4 mr-2" />
											) : (
												<NO className="w-4 h-4 mr-2" />
											)}
											{langName}
										</DropdownMenuItem>
									))}
								</DropdownMenuContent>
							</DropdownMenu>
						</li>
					</ul>
				</div>
			</div>

			{/* Mobile Navigation */}
			<div id="main-nav-mobile" className="md:hidden flex items-center justify-between w-full py-4 px-6">
				<div className="w-10 h-10">
					<Image
						src="/images/favicon.svg"
						alt="Servanda"
						width={40}
						height={40}
						className="w-full h-full"
						draggable="false"
					/>
				</div>
				<div className="flex items-center">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon" disabled={isPending} className="mr-2">
								{locale === "en" ? (
									<GB className="w-5 h-5" />
								) : (
									<NO className="w-5 h-5" />
								)}
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							{Object.entries(languages).map(([langKey, langName]) => (
								<DropdownMenuItem
									key={langKey}
									onClick={() => changeLanguage(langKey as Locale)}
								>
									{langKey === "en" ? (
										<GB className="w-4 h-4 mr-2" />
									) : (
										<NO className="w-4 h-4 mr-2" />
									)}
									{langName}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
					<Sheet open={open} onOpenChange={setOpen}>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon">
								<div className="flex flex-col justify-between h-6 w-7">
									<span className="w-full h-0.5 bg-black"></span>
									<span className="w-full h-0.5 bg-black"></span>
									<span className="w-full h-0.5 bg-black"></span>
								</div>
								<span className="sr-only">Toggle menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white p-0">
							<nav className="flex flex-col h-full pt-8">
								<div className="px-6 py-4 mb-4 border-b">
									<div className="w-12 h-12">
										<Image
											src="/images/favicon.svg"
											alt="Servanda"
											width={48}
											height={48}
											className="w-full h-full"
											draggable="false"
										/>
									</div>
								</div>
								<div className="flex flex-col space-y-4 px-6">
									<a
										href="#product"
										className="text-xl py-3 text-black hover:text-gray-600"
										onClick={(e) => handleLinkClick(e, "product")}
										draggable="false"
									>
										{t("product")}
									</a>
									<a
										href="#security"
										className="text-xl py-3 text-black hover:text-gray-600"
										onClick={(e) => handleLinkClick(e, "security")}
										draggable="false"
									>
										{t("security")}
									</a>
									<a
										href="#team"
										className="text-xl py-3 text-black hover:text-gray-600"
										onClick={(e) => handleLinkClick(e, "team")}
										draggable="false"
									>
										{t("team")}
									</a>
									<a
										href="#news"
										className="text-xl py-3 text-black hover:text-gray-600"
										onClick={(e) => handleLinkClick(e, "news")}
										draggable="false"
									>
										{t("news")}
									</a>
									<a
										href="#contact"
										className="text-xl py-3 text-black hover:text-gray-600"
										onClick={(e) => handleLinkClick(e, "contact")}
										draggable="false"
									>
										{t("contact")}
									</a>
								</div>
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</>
	);
}
