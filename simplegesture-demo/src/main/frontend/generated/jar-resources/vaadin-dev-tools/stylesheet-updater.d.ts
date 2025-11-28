/**
 * Reloads all stylesheets elements that directly or transitively reference the given resource.
 * This includes CSS imports, font references, and image URLs.
 * @param resourcePath - The path to the resource (CSS file, image, font, etc.)
 * @returns A promise that resolves when all stylesheets have been updated
 */
export declare function updateStylesheetsReferencingResource(resourcePath: string): Promise<void>;
