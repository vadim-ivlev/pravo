<?php

namespace JuristBundle\Entity;

/**
 * AuthUsers
 */
class AuthUsers
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var integer
     */
    private $UserModefiededId;

    /**
     * @var string
     */
    private $answers;

    /**
     * @var integer
     */
    private $rubrics;

    /**
     * @var integer
     */
    private $companiesId;

    /**
     * @var string
     */
    private $name;

    /**
     * @var string
     */
    private $secondName;

    /**
     * @var string
     */
    private $patronymic;

    /**
     * @var string
     */
    private $email;

    /**
     * @var boolean
     */
    private $pass;

    /**
     * @var string
     */
    private $graduate;

    /**
     * @var string
     */
    private $biography;

    /**
     * @var boolean
     */
    private $isModerator;

    /**
     * @var boolean
     */
    private $isJurist;

    /**
     * @var boolean
     */
    private $disabled;

    /**
     * @var boolean
     */
    private $isModeratorCompanies;

    /**
     * @var \DateTime
     */
    private $dateEndPay;

    /**
     * @var \DateTime
     */
    private $dateEndPayFeedbackButton;

    /**
     * @var boolean
     */
    private $juristFeedbackSiteOrEmail;

    /**
     * @var string
     */
    private $juristDataFeedback;

    /**
     * @var string
     */
    private $directory;

    /**
     * @var string
     */
    private $filename;

    /**
     * @var integer
     */
    private $width;

    /**
     * @var integer
     */
    private $height;

    /**
     * @var integer
     */
    private $mainRubric;

    /**
     * @var \DateTime
     */
    private $dateEndOfferServices;

    /**
     * @var integer
     */
    private $totalRating;

    /**
     * @var integer
     */
    private $totalCountPublicAnswers;

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set UserModefiededId
     *
     * @param integer $UserModefiededId
     *
     * @return AuthUsers
     */

    public function setUserModefiededId($UserModefiededId)
    {
        $this->UserModefiededId = $UserModefiededId;

        return $this;
    }

    /**
     * Get UserModefiededId
     *
     * @return integer
     */
    public function getUserModefiededId()
    {
        return $this->UserModefiededId;
    }

    /**
     * Set Answers
     *
     * @param string $answers
     *
     * @return Jurists
     */
    public function setAnswers($answers)
    {
        $this->answers = $answers;

        return $this;
    }

    /**
     * Get answers
     *
     * @return string
     */
    public function getAnswers()
    {
        return $this->answers;
    }

    /**
     * Set rubricsTarget
     *
     * @param integer $rubrics
     *
     * @return AuthUsers
     */
    public function setRubrics($rubrics)
    {
        $this->rubrics = $rubrics;

        return $this;
    }

    /**
     * Get rubrics
     *
     * @return integer
     */
    public function getRubrics()
    {
        return $this->rubrics;
    }

    /**
     * Set companiesId
     *
     * @param integer $companiesId
     *
     * @return AuthUsers
     */
    public function setCompaniesId($companiesId)
    {
        $this->companiesId = $companiesId;

        return $this;
    }

    /**
     * Get companiesId
     *
     * @return integer
     */
    public function getCompaniesId()
    {
        return $this->companiesId;
    }
    
    /**
     * Set name
     *
     * @param string $name
     *
     * @return AuthUsers
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set secondName
     *
     * @param string $secondName
     *
     * @return AuthUsers
     */
    public function setSecondName($secondName)
    {
        $this->secondName = $secondName;

        return $this;
    }

    /**
     * Get secondName
     *
     * @return string
     */
    public function getSecondName()
    {
        return $this->secondName;
    }

    /**
     * Set patronymic
     *
     * @param string $patronymic
     *
     * @return AuthUsers
     */
    public function setPatronymic($patronymic)
    {
        $this->patronymic = $patronymic;

        return $this;
    }

    /**
     * Get patronymic
     *
     * @return string
     */
    public function getPatronymic()
    {
        return $this->patronymic;
    }

    /**
     * Set email
     *
     * @param string $email
     *
     * @return AuthUsers
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email
     *
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set pass
     *
     * @param boolean $pass
     *
     * @return AuthUsers
     */
    public function setPass($pass)
    {
        $this->pass = $pass;

        return $this;
    }

    /**
     * Get pass
     *
     * @return boolean
     */
    public function getPass()
    {
        return $this->pass;
    }

    /**
     * Set graduate
     *
     * @param string $graduate
     *
     * @return AuthUsers
     */
    public function setGraduate($graduate)
    {
        $this->graduate = $graduate;

        return $this;
    }

    /**
     * Get graduate
     *
     * @return string
     */
    public function getGraduate()
    {
        return $this->graduate;
    }

    /**
     * Set biography
     *
     * @param string $biography
     *
     * @return AuthUsers
     */
    public function setBiography($biography)
    {
        $this->biography = $biography;

        return $this;
    }

    /**
     * Get biography
     *
     * @return string
     */
    public function getBiography()
    {
        return $this->biography;
    }

    /**
     * Set isModerator
     *
     * @param boolean $isModerator
     *
     * @return AuthUsers
     */
    public function setIsModerator($isModerator)
    {
        $this->isModerator = $isModerator;

        return $this;
    }

    /**
     * Get isModerator
     *
     * @return boolean
     */
    public function getIsModerator()
    {
        return $this->isModerator;
    }

    /**
     * Set isJurist
     *
     * @param boolean $isJurist
     *
     * @return AuthUsers
     */
    public function setIsJurist($isJurist)
    {
        $this->isJurist = $isJurist;

        return $this;
    }

    /**
     * Get isJurist
     *
     * @return boolean
     */
    public function getIsJurist()
    {
        return $this->isJurist;
    }

    /**
     * Set disabled
     *
     * @param boolean $disabled
     *
     * @return AuthUsers
     */
    public function setDisabled($disabled)
    {
        $this->disabled = $disabled;

        return $this;
    }

    /**
     * Get disabled
     *
     * @return boolean
     */
    public function getDisabled()
    {
        return $this->disabled;
    }

    /**
     * Set isModeratorCompanies
     *
     * @param boolean $isModeratorCompanies
     *
     * @return AuthUsers
     */
    public function setIsModeratorCompanies($isModeratorCompanies)
    {
        $this->isModeratorCompanies = $isModeratorCompanies;

        return $this;
    }

    /**
     * Get isModeratorCompanies
     *
     * @return boolean
     */
    public function getIsModeratorCompanies()
    {
        return $this->isModeratorCompanies;
    }

    /**
     * Set dateEndPay
     *
     * @param \DateTime $dateEndPay
     *
     * @return AuthUsers
     */
    public function setDateEndPay($dateEndPay)
    {
        $this->dateEndPay = $dateEndPay;

        return $this;
    }

    /**
     * Get dateEndPay
     *
     * @return \DateTime
     */
    public function getDateEndPay()
    {
        return $this->dateEndPay;
    }

    /**
     * Set dateEndPayFeedbackButton
     *
     * @param \DateTime $dateEndPayFeedbackButton
     *
     * @return AuthUsers
     */
    public function setDateEndPayFeedbackButton($dateEndPayFeedbackButton)
    {
        $this->dateEndPayFeedbackButton = $dateEndPayFeedbackButton;

        return $this;
    }

    /**
     * Get dateEndPayFeedbackButton
     *
     * @return \DateTime
     */
    public function getDateEndPayFeedbackButton()
    {
        return $this->dateEndPayFeedbackButton;
    }

    /**
     * Set juristFeedbackSiteOrEmail
     *
     * @param boolean $juristFeedbackSiteOrEmail
     *
     * @return AuthUsers
     */
    public function setJuristFeedbackSiteOrEmail($juristFeedbackSiteOrEmail)
    {
        $this->juristFeedbackSiteOrEmail = $juristFeedbackSiteOrEmail;

        return $this;
    }

    /**
     * Get juristFeedbackSiteOrEmail
     *
     * @return boolean
     */
    public function getJuristFeedbackSiteOrEmail()
    {
        return $this->juristFeedbackSiteOrEmail;
    }

    /**
     * Set juristDataFeedback
     *
     * @param string $juristDataFeedback
     *
     * @return AuthUsers
     */
    public function setJuristDataFeedback($juristDataFeedback)
    {
        $this->juristDataFeedback = $juristDataFeedback;

        return $this;
    }

    /**
     * Get juristDataFeedback
     *
     * @return string
     */
    public function getJuristDataFeedback()
    {
        return $this->juristDataFeedback;
    }

    /**
     * Set directory
     *
     * @param string $directory
     *
     * @return AuthUsers
     */
    public function setDirectory($directory)
    {
        $this->directory = $directory;

        return $this;
    }

    /**
     * Get directory
     *
     * @return string
     */
    public function getDirectory()
    {
        return $this->directory;
    }

    /**
     * Set filename
     *
     * @param string $filename
     *
     * @return AuthUsers
     */
    public function setFilename($filename)
    {
        $this->filename = $filename;

        return $this;
    }

    /**
     * Get filename
     *
     * @return string
     */
    public function getFilename()
    {
        return $this->filename;
    }

    /**
     * Set width
     *
     * @param integer $width
     *
     * @return AuthUsers
     */
    public function setWidth($width)
    {
        $this->width = $width;

        return $this;
    }

    /**
     * Get width
     *
     * @return integer
     */
    public function getWidth()
    {
        return $this->width;
    }

    /**
     * Set height
     *
     * @param integer $height
     *
     * @return AuthUsers
     */
    public function setHeight($height)
    {
        $this->height = $height;

        return $this;
    }

    /**
     * Get height
     *
     * @return integer
     */
    public function getHeight()
    {
        return $this->height;
    }

    /**
     * Set mainRubric
     *
     * @param integer $mainRubric
     *
     * @return AuthUsers
     */
    public function setMainRubric($mainRubric)
    {
        $this->mainRubric = $mainRubric;

        return $this;
    }

    /**
     * Get mainRubric
     *
     * @return integer
     */
    public function getMainRubric()
    {
        return $this->mainRubric;
    }

    /**
     * Set dateEndOfferServices
     *
     * @param \DateTime $dateEndOfferServices
     *
     * @return AuthUsers
     */
    public function setDateEndOfferServices($dateEndOfferServices)
    {
        $this->dateEndOfferServices = $dateEndOfferServices;

        return $this;
    }

    /**
     * Get dateEndOfferServices
     *
     * @return \DateTime
     */
    public function getDateEndOfferServices()
    {
        return $this->dateEndOfferServices;
    }

    /**
     * Set totalRating
     *
     * @param integer $totalRating
     *
     * @return AuthUsers
     */
    public function setTotalRating($totalRating)
    {
        $this->totalRating = $totalRating;

        return $this;
    }

    /**
     * Get totalRating
     *
     * @return integer
     */
    public function getTotalRating()
    {
        return $this->totalRating;
    }

    /**
     * Set totalCountPublicAnswers
     *
     * @param integer $totalCountPublicAnswers
     *
     * @return AuthUsers
     */
    public function setTotalCountPublicAnswers($totalCountPublicAnswers)
    {
        $this->totalCountPublicAnswers = $totalCountPublicAnswers;

        return $this;
    }

    /**
     * Get totalCountPublicAnswers
     *
     * @return integer
     */
    public function getTotalCountPublicAnswers()
    {
        return $this->totalCountPublicAnswers;
    }
}

