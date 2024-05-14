/* eslint-disable @next/next/no-img-element */
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, X, Save } from 'lucide-react'

import Container from '@/components/Container'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'

interface CloudinaryResources {
  height: number
  public_id: string
  secure_url: string
  width: number
}

interface MediaGalleryProps {
  resources: Array<CloudinaryResources>
}

const MediaGallery = ({ resources }: MediaGalleryProps) => {
  const [selected, setSelected] = useState<Array<string>>([])
  const [creation, setCreation] = useState()

  /**
   * handleOnClearSelection
   */

  function handleOnClearSelection() {
    setSelected([])
  }

  /**
   * handleOnCreationOpenChange
   */

  function handleOnCreationOpenChange(isOpen: boolean) {
    if (!isOpen) {
      setCreation(undefined)
    }
  }

  return (
    <>
      {/** Popup modal used to preview and confirm new creations */}

      <Dialog open={!!creation} onOpenChange={handleOnCreationOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save your creation?</DialogTitle>
          </DialogHeader>
          <DialogFooter className="justify-end sm:justify-end">
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save to Library
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/** Management navbar presented when assets are selected */}

      {selected.length > 0 && (
        <Container className="fixed left-0 top-0 z-50 flex h-16 w-full items-center justify-between gap-4 bg-white shadow-lg">
          <div className="flex items-center gap-4">
            <ul>
              <li>
                <Button variant="ghost" onClick={handleOnClearSelection}>
                  <X className="h-6 w-6" />
                  <span className="sr-only">Clear Selected</span>
                </Button>
              </li>
            </ul>
            <p>
              <span>{selected?.length} Selected</span>
            </p>
          </div>
          <ul className="flex items-center gap-4">
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">
                    <Plus className="h-6 w-6" />
                    <span className="sr-only">Create New</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <span>Option</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          </ul>
        </Container>
      )}

      {/** Gallery */}

      <Container>
        <form>
          {Array.isArray(resources) && (
            <ul className="mb-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {resources.map((resource) => {
                const isChecked = selected.includes(resource.public_id)

                function handleOnSelectResource(checked: boolean) {
                  setSelected((prev) => {
                    if (checked) {
                      return Array.from(
                        new Set([...(prev || []), resource.public_id])
                      )
                    } else {
                      return prev.filter((id) => id !== resource.public_id)
                    }
                  })
                }

                return (
                  <li
                    key={resource.public_id}
                    className="bg-white dark:bg-zinc-700"
                  >
                    <div className="group relative">
                      <label
                        className={`absolute ${isChecked ? 'opacity-100' : 'opacity-0'} left-3 top-3 p-1 transition-opacity group-hover:opacity-100`}
                        htmlFor={resource.public_id}
                      >
                        <span className="sr-only">
                          Select Image &quot;{resource.public_id}&quot;
                        </span>
                        <Checkbox
                          className={`h-6 w-6 rounded-full bg-white shadow ${isChecked ? 'border-blue-500' : 'border-zinc-200'}`}
                          id={resource.public_id}
                          onCheckedChange={handleOnSelectResource}
                          checked={isChecked}
                        />
                      </label>
                      <Link
                        className={`block cursor-pointer border-8 transition-[border] ${isChecked ? 'border-blue-500' : 'border-white'}`}
                        href="#"
                      >
                        <img
                          width={resource.width}
                          height={resource.height}
                          src={resource.secure_url}
                          alt="Cloudinary Logo"
                        />
                      </Link>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </form>
      </Container>
    </>
  )
}

export default MediaGallery
