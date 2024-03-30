"use client";

import Link from 'next/link';
import { AuthForm } from '../AuthForm/AuthForm.jsx';
import { Overlay } from '../Overlay/Overlay';
import { Popup } from '../Popup/Popup';

import Styles from './Header.module.css'
import { useState } from 'react';

import { usePathname } from 'next/navigation.js';
import { useStore } from "@/app/store/app-store";

export const Header = () => {


  const [popupIsOpened, setPopupIsOpened] = useState(false);

  const authContext = useStore();

  const openPopup = () => {
    setPopupIsOpened(true);
  };
  const closePopup = () => {
    setPopupIsOpened(false);
  };



  const pathname = usePathname();

  const handleLogout = () => {
    authContext.logout(); // Метод logout из контекста
  };
  return (
    <header className={Styles["header"]}>
      {pathname === "/" ? (
        <span className={Styles["logo"]}>
          <img
            className={Styles['logo__image']}
            src="../images/logo.svg"
            alt="Логотип Pindie"
          />
        </span>
      ) : (
        <Link href="/" className={Styles['logo']}>
          <img
            className={Styles['logo__image']}
            src="../images/logo.svg"
            alt="Логотип Pindie"
          />
        </Link>
      )}
      <nav className={Styles['menu']}>
        <ul className={Styles['menu__list']}>
          <li className={Styles['menu__item']}>
            <Link
              href="/new"
              className={`${Styles["menu__link"]} ${pathname === "/new" ? Styles["menu__link_active"] : ""}`}>
              Новинки
            </Link>
          </li>
          <li className={Styles['menu__item']}>
            <Link href="/popular" className={`${Styles["menu__link"]} ${pathname === "/popular" ? Styles["menu__link_active"] : ""}`}>
              Популярные
            </Link>
          </li>
          <li className={Styles['menu__item']}>
            <Link href="/shooter" className={`${Styles["menu__link"]} ${pathname === "/shooter" ? Styles["menu__link_active"] : ""}`}>
              Шутеры
            </Link>
          </li>
          <li className={Styles['menu__item']}>
            <Link href="/runner" className={`${Styles["menu__link"]} ${pathname === "/runner" ? Styles["menu__link_active"] : ""}`}>
              Ранеры
            </Link>
          </li>
          <li className={Styles['menu__item']}>
            <Link href="/pixel" className={`${Styles["menu__link"]} ${pathname === "/pixel" ? Styles["menu__link_active"] : ""}`}>
              Пиксельные
            </Link>
          </li>
          <li className={Styles['menu__item']}>
            <Link href="/TDS" className={`${Styles["menu__link"]} ${pathname === "/TDS" ? Styles["menu__link_active"] : ""}`}>
              TDS
            </Link>
          </li>
        </ul>
        <div className={Styles['auth']}>
          {authContext.isAuth ? (
            <button className={Styles['auth__button']} onClick={handleLogout}>
              Выйти
            </button>
          ) : (
            <button className={Styles['auth__button']} onClick={openPopup}>
              Войти
            </button>
          )}
        </div>
      </nav>
      <Overlay popupIsOpened={popupIsOpened} closePopup={closePopup} />
      <Popup popupIsOpened={popupIsOpened} closePopup={closePopup}>
        <AuthForm close={closePopup} />
      </Popup>
    </header>
  );
}